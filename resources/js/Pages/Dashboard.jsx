import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaEnvelope, FaBoxes, FaComments, FaSpinner } from 'react-icons/fa';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(response => setStats(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-4xl text-orange-600" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <FaEnvelope className="text-blue-500 text-3xl mb-3" />
          <p className="text-gray-500">Messages</p>
          <p className="text-3xl font-bold">{stats?.total_messages || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <FaBoxes className="text-green-500 text-3xl mb-3" />
          <p className="text-gray-500">Services actifs</p>
          <p className="text-3xl font-bold">{stats?.active_services || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <FaComments className="text-purple-500 text-3xl mb-3" />
          <p className="text-gray-500">Témoignages</p>
          <p className="text-3xl font-bold">{stats?.total_testimonials || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;