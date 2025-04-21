import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiLock, FiBriefcase, FiX } from 'react-icons/fi';

const UserModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'developer',
    status: 'active'
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'developer',
        status: user.status || 'active'
      });
    }
  }, [user]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!user && !formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onClose(); // Close modal after submission
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold">
            {user ? 'Edit User' : 'Create New User'}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full p-2.5 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'dark:border-gray-700'
                } dark:bg-gray-900`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full p-2.5 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'dark:border-gray-700'
                } dark:bg-gray-900`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            {!user && (
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <FiLock className="w-4 h-4" />
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    setPasswordStrength(calculatePasswordStrength(e.target.value));
                  }}
                  className={`w-full p-2.5 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'dark:border-gray-700'
                  } dark:bg-gray-900`}
                />
                <div className="mt-2 flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < passwordStrength ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            )}

            {/* Role and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <FiBriefcase className="w-4 h-4" />
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full p-2.5 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
                >
                  <option value="developer">Developer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-2.5 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  {user ? 'Save Changes' : 'Create User'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;