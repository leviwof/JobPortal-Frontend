import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { isDarkMode, setCurrentUser } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', { email, password });
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      });
      console.log('Response:', response.data);
      if (response.status === 200) {
        const { token, user } = response.data;
        if (!user) throw new Error('User data missing from response');
        localStorage.setItem('token', token);
        setCurrentUser(user);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error:', err);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError((err).message || 'Server error.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className={`flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
            isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-600' : ''
          }`}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Login Form */}
      <div
        className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded-lg shadow-md p-8`}
      >
        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-8">Welcome Back</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>

          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'} hover:underline`}>
              Sign Up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;