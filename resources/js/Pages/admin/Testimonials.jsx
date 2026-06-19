import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaTrash, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = async () => {
    try {
      const response = await api.get('/admin/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      toast.error('Impossible de charger les témoignages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/admin/testimonials/${id}/approve`);
      toast.success('Statut mis à jour.');
      loadTestimonials();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    try {
      await api.delete(`/admin/testimonials/${id}`);
      toast.success('Témoignage supprimé.');
      loadTestimonials();
    } catch (error) {
      toast.error('Impossible de supprimer le témoignage.');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-4xl text-orange-600" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Témoignages</h1>
        <p className="text-sm text-gray-600">Liste des témoignages soumis par les visiteurs.</p>
      </div>
      {testimonials.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">Aucun témoignage trouvé.</div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {testimonials.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">{item.name?.fr || 'Anonyme'}</td>
                  <td className="px-4 py-3 max-w-xl truncate">{item.content?.fr || item.content?.en || ''}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.is_approved ? 'Approuvé' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button onClick={() => handleApprove(item.id)} className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700">{item.is_approved ? 'Désapprouver' : 'Approuver'}</button>
                    <button onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminTestimonials;
