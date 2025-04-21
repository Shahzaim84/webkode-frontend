import { useState } from 'react';
import { 
  FiUsers, 
  FiActivity, 
  FiPlus, 
  FiSearch,
  FiSettings,
  FiLogOut,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';
import UserModal from '../../../components/Admin/Dashboard/UserModal';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
  ];

  const logs = [
    { id: 1, userId: 1, endpoint: '/api/payment', timestamp: '2024-03-25 14:30' },
    { id: 2, userId: 2, endpoint: '/api/subscribe', timestamp: '2024-03-25 15:45' }
  ];

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Enhanced Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-[#e5e7eb]/50">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#fe121a] to-[#ff4d4d] bg-clip-text text-transparent">
            API Manager
          </h1>
        </div>
        
        <nav className="mt-6 px-4">
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all ${
              activeTab === 'users' 
                ? 'bg-gradient-to-r from-[#fe121a]/10 to-[#fe121a]/5 text-[#fe121a] shadow-sm' 
                : 'hover:bg-[#fe121a]/5 text-[#111827]/80 hover:text-[#fe121a]'
            }`}
          >
            <FiUsers className="mr-3 text-lg" />
            <span className="font-medium">Users</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all mt-2 ${
              activeTab === 'logs' 
                ? 'bg-gradient-to-r from-[#fe121a]/10 to-[#fe121a]/5 text-[#fe121a] shadow-sm' 
                : 'hover:bg-[#fe121a]/5 text-[#111827]/80 hover:text-[#fe121a]'
            }`}
          >
            <FiActivity className="mr-3 text-lg" />
            <span className="font-medium">Logs</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`transition-margin duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Enhanced Header */}
        <header className="p-6 bg-white/80 backdrop-blur-sm border-b border-[#e5e7eb]/50 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-[#111827]">
              {activeTab === 'users' ? '👤 User Management' : '📜 API Logs'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fe121a] to-[#ff4d4d] text-white flex items-center justify-center shadow-lg hover:shadow-[#fe121a]/20 transition-shadow">
                JD
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl py-2 hidden group-hover:block border border-[#e5e7eb]/50">
                <button className="w-full px-4 py-2.5 text-left hover:bg-[#fe121a]/5 flex items-center text-[#111827]/90 hover:text-[#fe121a] transition-colors">
                  <FiSettings className="mr-2" /> Settings
                </button>
                <button className="w-full px-4 py-2.5 text-left hover:bg-[#fe121a]/5 flex items-center text-[#111827]/90 hover:text-[#fe121a] transition-colors">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Users Section */}
        {activeTab === 'users' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="relative w-96">
                <div className="absolute left-3 top-3.5 text-[#111827]/40">
                  <FiSearch className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#fe121a]/30 focus:ring-2 focus:ring-[#fe121a]/10 bg-white/50 backdrop-blur-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowUserModal(true)}
                className="bg-gradient-to-br from-[#fe121a] to-[#ff4d4d] text-white px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-[#fe121a]/20 transition-all flex items-center gap-2"
              >
                <FiPlus className="text-lg" />
                New User
              </button>
            </div>

            {/* Enhanced Users Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-[#e5e7eb]/50 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#fe121a]/5 to-[#fe121a]/3">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">Name</th>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">Email</th>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">Status</th>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t border-[#e5e7eb]/50 hover:bg-[#fe121a]/3 transition-colors group">
                      <td className="px-6 py-4 text-[#111827] font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-[#111827]/80">{user.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <span className={`text-sm ${
                            user.status === 'active' 
                              ? 'text-green-700' 
                              : 'text-red-700'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button className="text-[#111827]/50 hover:text-[#fe121a] p-2 rounded-lg hover:bg-[#fe121a]/10 transition-colors">
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button className="text-[#111827]/50 hover:text-red-600 p-2 rounded-lg hover:bg-red-100/50 transition-colors">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Enhanced Logs Section */}
        {activeTab === 'logs' && (
          <div className="p-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-[#e5e7eb]/50 overflow-hidden">
              <div className="p-4 border-b border-[#e5e7eb]/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                    <input
                      type="date"
                      className="w-full md:w-48 px-4 py-2.5 rounded-xl border border-[#e5e7eb] bg-white/50 focus:border-[#fe121a]/30 focus:ring-2 focus:ring-[#fe121a]/10"
                    />
                  </div>
                  <span className="text-[#111827]/50">to</span>
                  <div className="relative flex-1 md:flex-none">
                    <input
                      type="date"
                      className="w-full md:w-48 px-4 py-2.5 rounded-xl border border-[#e5e7eb] bg-white/50 focus:border-[#fe121a]/30 focus:ring-2 focus:ring-[#fe121a]/10"
                    />
                  </div>
                </div>
                <div className="relative w-full md:w-96">
                  <FiSearch className="absolute left-3 top-3.5 text-[#111827]/40" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e5e7eb] focus:border-[#fe121a]/30 focus:ring-2 focus:ring-[#fe121a]/10 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#fe121a]/5 to-[#fe121a]/3">
                  <tr>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">User ID</th>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">Endpoint</th>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">Timestamp</th>
                    <th className="px-6 py-4 text-left text-[#111827] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id} className="border-t border-[#e5e7eb]/50 hover:bg-[#fe121a]/3 transition-colors">
                      <td className="px-6 py-4 text-[#111827] font-medium">#{log.userId}</td>
                      <td className="px-6 py-4 text-[#111827]/80 font-mono">{log.endpoint}</td>
                      <td className="px-6 py-4 text-[#111827]/60">{log.timestamp}</td>
                      <td className="px-6 py-4">
                        <button className="text-[#111827]/50 hover:text-[#fe121a] px-3 py-1.5 rounded-lg hover:bg-[#fe121a]/10 transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
      />
    </div>
  );
};

export default AdminDashboard;