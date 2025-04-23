import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useStore } from '../store';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();
  const isDarkMode = useStore((state) => state.isDarkMode);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Applicant'); // Default role
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', { name, email, password, role });
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        password,
        role, // Send role to backend
      });
      console.log('Response:', response.data);
      if (response.status === 200) {
        toast.success('Signup done successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError((err as any).response?.data?.message || 'Server error.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div
        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8`}
      >
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-8">Create Account</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } border focus:ring-2 focus:ring-green-500`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } border focus:ring-2 focus:ring-green-500`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } border focus:ring-2 focus:ring-green-500`}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              } border focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value="Applicant">Applicant</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className={`${isDarkMode ? 'text-blue-300' : 'text-blue-600'} hover:underline`}>
            Login here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;