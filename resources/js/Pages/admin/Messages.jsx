import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaEnvelopeOpenText, FaClock, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      const response = await api.get('/admin/messages');
      setMessages(response.data);
    } catch (error) {
      toast.error('Impossible de charger les messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await api.patch(`/admin/messages/${id}/status`, { status });
      toast.success('Statut mis à jour.');
      loadMessages();
    } catch (error) {
      toast.error('Impossible de mettre à jour le statut.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      toast.success('Message supprimé.');
      loadMessages();
    } catch (error) {
      toast.error('Impossible de supprimer le message.');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-4xl text-orange-600" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-gray-600">Gérez les demandes envoyées depuis le formulaire de contact.</p>
      </div>
      {messages.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">Aucun message reçu.</div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{message.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{message.email} • {message.phone || 'Sans téléphone'}</p>
                </div>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${message.status === 'unread' ? 'bg-yellow-100 text-yellow-800' : message.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  <FaEnvelopeOpenText /> {message.status}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{message.message}</p>
              <div className="flex flex-wrap gap-2">
                {message.status !== 'read' && (
                  <button onClick={() => handleStatus(message.id, 'read')} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Marquer lu</button>
                )}
                {message.status !== 'processed' && (
                  <button onClick={() => handleStatus(message.id, 'processed')} className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">Traité</button>
                )}
                <button onClick={() => handleDelete(message.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
