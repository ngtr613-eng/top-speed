import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { AnimatedButton, PageTransition } from '../components/Animations';
import { Header, Footer } from '../components/Layout';
import { Navigation } from '../components/Navigation';
import { Lock, Mail } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      login(response.data.token, response.data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Navigation />
      <Header title="Admin Login" subtitle="Secure access to admin dashboard" />

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none transition"
                    placeholder="admin@topspeed.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none transition"
                    placeholder="Secure password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <AnimatedButton
                onClick={handleLogin}
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </AnimatedButton>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};
