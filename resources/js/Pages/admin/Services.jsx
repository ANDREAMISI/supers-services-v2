import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import ServiceForm from '../../Components/ServiceForm';
import toast from 'react-hot-toast';

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get('/admin/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des services');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      const formData = new FormData();
      ['fr', 'en', 'ln', 'sw'].forEach((lang) => {
        formData.append(`title[${lang}]`, data.title[lang] || '');
        formData.append(`description[${lang}]`, data.description[lang] || '');
      });
      formData.append('icon', data.icon);
      formData.append('is_active', data.is_active ? '1' : '0');
      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }

      if (editingService) {
        formData.append('_method', 'PUT');
        await api.post(`/admin/services/${editingService.id}`, formData);
        toast.success('Service modifié avec succès');
      } else {
        await api.post('/admin/services', formData);
        toast.success('Service créé avec succès');
      }
      setShowForm(false);
      setEditingService(null);
      loadServices();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Voulez-vous vraiment supprimer ce service ?')) return;
    try {
      await api.delete(`/admin/services/${id}`);
      toast.success('Service supprimé');
      loadServices();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/admin/services/${id}/toggle`);
      loadServices();
    } catch (error) {
      toast.error('Erreur lors du changement de statut');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-4xl text-orange-600" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Services</h1>
        <button
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          <FaPlus /> Nouveau service
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Icône / Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">{service.title?.fr || 'Sans titre'}</td>
                <td className="px-6 py-4">
                  {service.image ? (
                    <img src={service.image} alt={service.title?.fr || 'Service'} className="h-12 w-12 rounded-lg object-cover" />
                  ) : (
                    <span>{service.icon}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {service.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggle(service.id)}
                      className="p-1 text-gray-600 hover:text-orange-600"
                    >
                      {service.is_active ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingService(service);
                        setShowForm(true);
                      }}
                      className="p-1 text-gray-600 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-1 text-gray-600 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingService(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminServices;