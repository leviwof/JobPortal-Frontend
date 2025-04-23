import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { dummyJobs, dummyApplications } from '../data';

const monthlyData = [
  { month: 'Jan', jobs: 4 },
  { month: 'Feb', jobs: 6 },
  { month: 'Mar', jobs: 8 },
  { month: 'Apr', jobs: 5 },
  { month: 'May', jobs: 7 },
  { month: 'Jun', jobs: 9 },
];

const categoryData = [
  { name: 'Development', value: 35 },
  { name: 'Design', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Sales', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function EmployerDashboard() {
  const { isDarkMode, currentUser } = useStore();
  const navigate = useNavigate();

  const employerJobs = dummyJobs.filter(job => job.company === currentUser?.company);
  const applications = dummyApplications.filter(app => 
    employerJobs.some(job => job.id === app.jobId)
  );

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')} // Changed to navigate to home
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
          <h1 className="text-3xl font-bold mb-4">Employer Dashboard</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Welcome back, {currentUser?.name}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{employerJobs.length}</p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
            <p className="text-3xl font-bold text-green-600">{applications.length}</p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {applications.filter(app => app.status === 'pending').length}
            </p>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold mb-2">Hired</h3>
            <p className="text-3xl font-bold text-purple-600">
              {applications.filter(app => app.status === 'accepted').length}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-xl font-bold mb-4">Monthly Job Postings</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#4B5563' : '#E5E7EB'} />
                  <XAxis dataKey="month" stroke={isDarkMode ? '#D1D5DB' : '#374151'} />
                  <YAxis stroke={isDarkMode ? '#D1D5DB' : '#374151'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      color: isDarkMode ? '#D1D5DB' : '#374151',
                    }}
                  />
                  <Bar dataKey="jobs" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-xl font-bold mb-4">Jobs by Category</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      color: isDarkMode ? '#D1D5DB' : '#374151',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
          <h2 className="text-xl font-bold p-6 border-b border-gray-200 dark:border-gray-700">
            Recent Applications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className="px-6 py-3 text-left">Job Title</th>
                  <th className="px-6 py-3 text-left">Applicant</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map((app, index) => {
                  const job = employerJobs.find(j => j.id === app.jobId);
                  return (
                    <tr key={app.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4">{job?.title}</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">{app.appliedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployerDashboard;