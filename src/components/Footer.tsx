import { Link } from 'react-router-dom';
import { useStore } from '../store';

export default function Footer() {
     const { isDarkMode } = useStore();
  return (
    <footer >
      <div className={`${isDarkMode ? 'dark bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white-800 mb-4">JobPortal</h3>
            <p className="text-white-600">
              Connecting talented professionals with great employers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white-800 mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-white-600 hover:text-job-blue">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white-600 hover:text-job-blue">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white-600 hover:text-job-blue">
                  Job Seeker Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white-800 mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-white-600 hover:text-job-blue">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white-600 hover:text-job-blue">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-white-600 hover:text-job-blue">
                  Employer Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white-800 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white-600">
                Email: contact@jobportal.com
              </li>
              <li className="text-white-600">
                Phone: (123) 456-7890
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-white-600 hover:text-job-blue">
              Terms
            </Link>
            <Link to="/privacy" className="text-white-600 hover:text-job-blue">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
