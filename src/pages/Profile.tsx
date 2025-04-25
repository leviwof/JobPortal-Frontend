import { useState } from 'react';
import { useStore } from '../store';

function Profile() {
  const { currentUser, setCurrentUser } = useStore(); // Assume setCurrentUser updates the store
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    age: currentUser?.age || '',
    gender: currentUser?.gender || '',
    role: currentUser?.role || 'Applicant',
  });
  const [error, setError] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 3 || formData.name.length > 50) {
      return 'Name must be between 3 and 50 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Invalid email format';
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      return 'Phone must be a 10-digit number';
    }
    if (formData.age && (formData.age < 18 || isNaN(formData.age))) {
      return 'Age must be a number greater than or equal to 18';
    }
    if (formData.gender && !['male', 'female', 'others'].includes(formData.gender)) {
      return 'Gender must be male, female, or others';
    }
    if (!['Applicant', 'Recruiter'].includes(formData.role)) {
      return 'Role must be Applicant or Recruiter';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://jobportal-backend-3-7e5m.onrender.com/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _id: currentUser._id }),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const updatedUser = await response.json();
      setCurrentUser(updatedUser); // Update store with new user data
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Your Profile
        </h1>
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-blue-600 h-32 flex items-end justify-center">
            <div className="relative -bottom-12">
              <div className="h-24 w-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-3xl font-semibold text-gray-600">
                {currentUser.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          <div className="pt-16 pb-8 px-6 sm:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              {currentUser.name}
            </h2>
            <p className="text-center text-gray-500 mt-1">
              {currentUser.role || 'User'}
            </p>
            {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Applicant">Applicant</option>
                    <option value="Recruiter">Recruiter</option>
                  </select>
                </div>
              </form>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{currentUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {currentUser.phone || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Age</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {currentUser.age || 'Not provided'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {currentUser.gender || 'Not provided'}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-center gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;