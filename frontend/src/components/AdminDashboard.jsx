/**
 * Admin Dashboard Component Template
 * 
 * This is a template for an admin dashboard to manage projects and messages.
 * To implement:
 * 1. Add authentication middleware to backend routes
 * 2. Implement admin auth check in this component
 * 3. Add route in App.jsx
 * 
 * Features:
 * - View and manage projects
 * - View contact messages
 * - Add new projects
 * - Delete old messages
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectAPI, messageAPI } from '../services/apiServices';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  // Check if user is authenticated (implement based on your auth system)
  const isAuthenticated = !!localStorage.getItem('adminToken');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-gray-400">Please log in to access the admin dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'projects'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'messages'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Messages
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
            {/* Add project form and list here */}
            <p className="text-gray-400">Project management interface coming soon...</p>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
            {/* Messages table/list here */}
            <p className="text-gray-400">Message management interface coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
