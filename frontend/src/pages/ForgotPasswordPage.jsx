import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Mail, ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.post('/auth/forgot-password', { email });
      setSuccess(true);
      setEmail('');
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-12">
        <div className="w-full max-w-md">
          <div className="border border-gray-800 rounded-lg p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-900 to-black text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Check Your Email</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Redirecting to login in a few seconds...
            </p>
            <Link
              to="/login"
              className="inline-block mt-8 text-red-600 hover:text-red-500 font-medium text-sm"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-12">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <Link to="/login" className="inline-flex items-center text-red-600 hover:text-red-500 text-xs sm:text-sm font-medium mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Enter your email to receive a password reset link</p>
        </div>

        {/* Form Card */}
        <div className="border border-gray-800 rounded-lg p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-900 to-black">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-900 border border-gray-800 rounded-lg text-white text-xs sm:text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors duration-200"
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors duration-200 text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Link
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>

            {/* Divider */}
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm text-center">
                Remember your password?{' '}
                <Link to="/login" className="text-red-600 hover:text-red-500 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-gray-600 text-xs text-center mt-8">
          By resetting your password, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
