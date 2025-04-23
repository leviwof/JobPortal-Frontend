import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Search, Building2, Sun, Moon } from 'lucide-react';
import { useStore } from '../store';
import Footer from '../components/Footer';

function Home() {
  const { isDarkMode, toggleDarkMode, currentUser } = useStore();

  // Sample job data (hardcoded for demonstration)
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      description: 'Build responsive web applications using React and Tailwind CSS.',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataSys',
      location: 'San Francisco, CA',
      description: 'Develop scalable APIs with Node.js and MongoDB.',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'CreativeLabs',
      location: 'New York, NY',
      description: 'Design intuitive user interfaces for mobile and web platforms.',
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudNet',
      location: 'Austin, TX',
      description: 'Manage CI/CD pipelines and cloud infrastructure.',
    },
  ];

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Navbar (shown only for non-logged-in users) */}
      {!currentUser && (
        <nav className={`${isDarkMode ? 'dark bg-gray-800' : 'bg-white'} shadow-md sticky top-0 z-50`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                JobPortal
              </Link>
              <div className="flex items-center space-x-4">
                <Link
                  to="/jobs"
                  className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
                    isDarkMode ? 'dark:bg-blue-500 dark:hover:bg-blue-600' : ''
                  }`}
                >
                  Explore More
                </Link>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job Today</h1>
          <p className="text-xl mb-8">Connect with top employers and opportunities</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Jobs
            </Link>
            <Link
              to="/jobs"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Post a Job
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <Search className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Browse through thousands of job listings from top companies.
            </p>
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Apply</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Apply to multiple jobs with just a few clicks using your profile.
            </p>
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <Building2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Company Profiles</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Learn about company culture and benefits before applying.
            </p>
          </div>
        </div>

        {/* Job Cards Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Jobs</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
            {jobs.map((job) => (
              <Link
                key={job.id}
                to="/login"
                className={`flex-none w-80 p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
                } shadow-lg hover:shadow-xl transition snap-center`}
              >
                <div className="flex items-center mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{job.company}</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{job.location}</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2 line-clamp-2`}>{job.description}</p>
                <span className={`mt-4 inline-block text-blue-600 ${isDarkMode ? 'dark:text-blue-400' : ''} text-sm font-semibold`}>
                  View Details
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}

export default Home;