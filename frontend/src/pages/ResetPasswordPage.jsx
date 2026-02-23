import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('Invalid reset link. Please request a new one.');
        setTokenValid(false);
        setValidatingToken(false);
        return;
      }

      try {
        const response = await authService.post('/auth/verify-reset-token', { token });
        if (response.data.valid) {
          setTokenValid(true);
        } else {
          setError(response.data.error || 'Invalid or expired reset link.');
        }
      } catch (err) {
        setError('Invalid or expired reset link. Please request a new one.');
      } finally {
        setValidatingToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await authService.post('/auth/reset-password', {
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setSuccess(true);
      setFormData({ password: '', confirmPassword: '' });
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (validatingToken) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-12">
        <div className="w-full max-w-md">
          <div className="border border-gray-800 rounded-lg p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-900 to-black text-center">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-400 text-sm">Validating your reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-3 sm:px-4 md:px-6 py-6 sm:py-12">
        <div className="w-full max-w-md">
          <div className="border border-gray-800 rounded-lg p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-900 to-black text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Invalid Link</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              {error || 'This password reset link is invalid or has expired.'}
            </p>
            <Link
              to="/forgot-password"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors text-sm"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Password Reset Successful</h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Redirecting to login...
            </p>
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Create New Password</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Enter a strong password for your TOP SPEED account</p>
        </div>

        {/* Form Card */}
        <div className="border border-gray-800 rounded-lg p-4 sm:p-6 md:p-8 bg-gradient-to-b from-gray-900 to-black">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Password Field */}
            <div>
              <label className="block text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-12 py-2 sm:py-3 bg-gray-900 border border-gray-800 rounded-lg text-white text-xs sm:text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors duration-200"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">Minimum 6 characters</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-12 py-2 sm:py-3 bg-gray-900 border border-gray-800 rounded-lg text-white text-xs sm:text-sm placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors duration-200"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-900/50 text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                <p>{error}</p>
              </div>
            )}

            {/* Password Match Indicator */}
            {formData.password && formData.confirmPassword && (
              <div className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm ${
                formData.password === formData.confirmPassword
                  ? 'bg-green-900/20 border border-green-900/50 text-green-400'
                  : 'bg-red-900/20 border border-red-900/50 text-red-400'
              }`}>
                {formData.password === formData.confirmPassword
                  ? '✓ Passwords match'
                  : '✗ Passwords do not match'}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || formData.password !== formData.confirmPassword}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors duration-200 text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-gray-600 text-xs text-center mt-8">
          Your password is secure and encrypted for your protection
        </p>
      </div>
    </div>
  );
};
