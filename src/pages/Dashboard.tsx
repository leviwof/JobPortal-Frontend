import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { dummyJobs, dummyApplications } from '../data';

function Dashboard() {
  const { isDarkMode, currentUser } = useStore();
  const navigate = useNavigate();

  // Filter applications for the current user
  const userApplications = dummyApplications.filter(app => app.userId === currentUser?._id);
  const appliedJobs = userApplications.map(app => ({
    ...app,
    job: dummyJobs.find(job => job.id === app.jobId),
  }));

  if (currentUser?.role !== 'Applicant') {
    return (
      <div className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
        <div className="container mx-auto px-4 py-8">
          <p className="text-xl">Access denied. This dashboard is for Applicants only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
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

        {/* Dashboard Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Applicant Dashboard</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Welcome back, {currentUser?.name || 'Applicant'}
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
          <h2 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-700">
            Your Applications
          </h2>
          {appliedJobs.length === 0 ? (
            <p className="p-6 text-gray-500 dark:text-gray-400">You haven't applied to any jobs yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-6 py-3 text-left">Job Title</th>
                    <th className="px-6 py-3 text-left">Company</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Applied Date</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedJobs.map(({ id, job, status, appliedDate }) => (
                    <tr key={id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4">{job?.title || 'N/A'}</td>
                      <td className="px-6 py-4">{job?.company || 'N/A'}</td>
                      <td className="px-6 py-4">{job?.location || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">{appliedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;