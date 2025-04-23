import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, Clock, Briefcase, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { dummyJobs, dummyApplications } from '../data';

function Jobs() {
  const { isDarkMode, currentUser } = useStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(new Set()); // Track applied job IDs
  const [message, setMessage] = useState(''); // Success/error message

  const filteredJobs = dummyJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(dummyJobs.map(job => job.category))];

  const handleApply = (jobId) => {
    setMessage('');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.role !== 'Applicant') {
      setMessage('Only Applicants can apply for jobs.');
      return;
    }
    if (appliedJobs.has(jobId)) {
      setMessage('You have already applied for this job.');
      return;
    }

    // Add application to dummyApplications
    const newApplication = {
      id: dummyApplications.length + 1,
      userId: currentUser._id,
      jobId,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0], // e.g., '2025-04-22'
    };
    dummyApplications.push(newApplication);
    setAppliedJobs(new Set([...appliedJobs, jobId]));
    setMessage('Application submitted successfully!');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3s
  };

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Your Next Opportunity</h1>
          
          {message && (
            <div className={`mb-4 p-3 rounded-lg ${
              message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className={`flex items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-2 shadow-md`}>
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full bg-transparent focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                />
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <Link to={`/jobs/${job.id}`}>
                    <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">{job.title}</h2>
                  </Link>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span className="mr-4">{job.company}</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {job.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      {job.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-blue-600">{job.salary}</div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Posted {job.postedDate}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleApply(job.id)}
                disabled={appliedJobs.has(job.id) || currentUser?.role !== 'Applicant'}
                className={`mt-4 flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                  appliedJobs.has(job.id) || currentUser?.role !== 'Applicant'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-600' : ''}`}
              >
                <Briefcase size={18} />
                <span>Apply</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;