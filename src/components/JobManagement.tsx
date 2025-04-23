import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '../store';

function JobManagement() {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const token = localStorage.getItem('token');

  const [jobs, setJobs] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('Open'); // New: Job status
  const [selectedJobId, setSelectedJobId] = useState('');
  const [error, setError] = useState('');

  // Fetch all jobs
  useEffect(() => {
    if (!token || !currentUser) {
      navigate('/login');
      return;
    }
    fetchJobs();
  }, [token, currentUser, navigate]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Add dummy applicant count for HR view
      const jobsWithApplicants = response.data.map((job: any) => ({
        ...job,
        applicantCount: Math.floor(Math.random() * 10) + 1, // Random 1-10 applicants
      }));
      setJobs(jobsWithApplicants);
    } catch (err) {
      setError((err as any).response?.data || 'Error fetching jobs');
    }
  };

  // Create job
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/jobs',
        { title, description, company, location, salary, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs([...jobs, { ...response.data, applicantCount: 0 }]);
      setTitle('');
      setDescription('');
      setCompany('');
      setLocation('');
      setSalary('');
      setStatus('Open');
      setError('');
    } catch (err) {
      setError((err as any).response?.data || 'Error creating job');
    }
  };

  // Update job
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/jobs/${selectedJobId}`,
        { title, description, company, location, salary, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(jobs.map(job => job._id === selectedJobId ? { ...response.data, applicantCount: job.applicantCount } : job));
      setSelectedJobId('');
      setTitle('');
      setDescription('');
      setCompany('');
      setLocation('');
      setSalary('');
      setStatus('Open');
      setError('');
    } catch (err) {
      setError((err as any).response?.data || 'Error updating job');
    }
  };

  // Delete job
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter(job => job._id !== id));
      setError('');
    } catch (err) {
      setError((err as any).response?.data || 'Error deleting job');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Management Dashboard</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {/* Job Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {selectedJobId ? 'Edit Job Listing' : 'Create New Job Listing'}
        </h2>
        <form onSubmit={selectedJobId ? handleUpdate : handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Job Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Developer"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Company *</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Tech Corp"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Delhi"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g., 50000"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job description..."
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 h-24"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition w-full"
            >
              {selectedJobId ? 'Update Job' : 'Create Job'}
            </button>
            {selectedJobId && (
              <button
                type="button"
                onClick={() => {
                  setSelectedJobId('');
                  setTitle('');
                  setDescription('');
                  setCompany('');
                  setLocation('');
                  setSalary('');
                  setStatus('Open');
                }}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition w-full"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Job List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Listings</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found. Create one to get started!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Title</th>
                  <th className="p-2">Company</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Salary</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Applicants</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{job.title}</td>
                    <td className="p-2">{job.company}</td>
                    <td className="p-2">{job.location}</td>
                    <td className="p-2">${job.salary}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded ${job.status === 'Open' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-2">{job.applicantCount}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedJobId(job._id);
                          setTitle(job.title);
                          setDescription(job.description);
                          setCompany(job.company);
                          setLocation(job.location);
                          setSalary(job.salary.toString());
                          setStatus(job.status);
                        }}
                        className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobManagement;