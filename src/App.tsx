import React, { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Navbar from './components/Navbar';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const EmployerDashboard = lazy(() => import('./pages/EmployerDashboard'));
const JobSeekerDashboard = lazy(() => import('./pages/JobSeekerDashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Signup = lazy(() => import('./pages/Signup'));
const JobManagement = lazy(() => import('./components/JobManagement'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  const { isDarkMode, currentUser } = useStore();

  // Memoize the dashboard route based on user role
  const DashboardRoute = useMemo(() => {
    if (!currentUser) return <Navigate to="/login" replace />;
    return currentUser.role === 'Applicant' ? <JobSeekerDashboard /> : <EmployerDashboard />;
  }, [currentUser]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply/job" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/dashboard" element={DashboardRoute} />
              <Route path="/employer/dashboard" element={<EmployerDashboard />} />
              <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/jobs" element={<JobManagement />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;