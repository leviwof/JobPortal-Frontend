import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';
import { useStore } from '../store';

function Navbar() {
  const { isDarkMode, toggleDarkMode, currentUser } = useStore();
  const navigate = useNavigate();
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleLogout = () => {
    useStore.setState({ currentUser: null });
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUserClick = () => {
    if (showUserDetails) {
      navigate('/profile');
    }
    setShowUserDetails(!showUserDetails);
  };

  if (!currentUser) return null;

  return (
    <nav className={`${isDarkMode ? 'dark bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            JobPortal
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Dashboard Link for Both Roles */}
            <Link
              to="/dashboard"
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-600`}
            >
              Dashboard
            </Link>

            {/* Conditional Buttons Based on Role */}
            {currentUser.role === 'Applicant' && (
              <Link
                to="/apply/job"
                className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
                  isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-600' : ''
                }`}
              >
                Apply Job
              </Link>
            )}
            {currentUser.role === 'Recruiter' && (
              <Link
                to="/jobs"
                className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition ${
                  isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''
                }`}
              >
                Post Job
              </Link>
            )}
            
            <button
              onClick={handleUserClick}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-600 flex items-center relative`}
            >
              <UserIcon size={20} className="mr-1" /> {currentUser.name || 'User'}
            </button>
            
            <button
              onClick={handleLogout}
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-red-600 flex items-center`}
            >
              <LogOut size={20} className="mr-1" /> Logout
            </button>
            
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* User Details Dropdown */}
        {showUserDetails && (
          <div className="absolute right-4 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 z-40">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">User Profile</h3>
            <p className="text-gray-600 dark:text-gray-300">Name: {currentUser.name}</p>
            <p className="text-gray-600 dark:text-gray-300">Email: {currentUser.email}</p>
            <p className="text-gray-600 dark:text-gray-300">Role: {currentUser.role || 'User'}</p>
            <button
              onClick={() => navigate('/profile')}
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              View Full Profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;