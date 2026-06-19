import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api.get('/admin/settings');
        setSettings(response.data);
      } catch (error) {
        toast.error('Impossible de charger les paramètres.');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (field, lang, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleSimpleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await api.put('/admin/settings', settings);
      toast.success('Paramètres enregistrés.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Impossible de sauvegarder les paramètres.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><FaSpinner className="animate-spin text-4xl text-orange-600" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Titre accueil FR</label>
              <input type="text" value={settings.home_title?.fr || ''} onChange={(e) => handleChange('home_title', 'fr', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Titre accueil EN</label>
              <input type="text" value={settings.home_title?.en || ''} onChange={(e) => handleChange('home_title', 'en', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Sous-titre FR</label>
              <input type="text" value={settings.home_subtitle?.fr || ''} onChange={(e) => handleChange('home_subtitle', 'fr', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Sous-titre EN</label>
              <input type="text" value={settings.home_subtitle?.en || ''} onChange={(e) => handleChange('home_subtitle', 'en', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description FR</label>
            <textarea value={settings.home_description?.fr || ''} onChange={(e) => handleChange('home_description', 'fr', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" rows={3} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Description EN</label>
            <textarea value={settings.home_description?.en || ''} onChange={(e) => handleChange('home_description', 'en', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" rows={3} required />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Téléphone</label>
              <input type="text" value={settings.phone || ''} onChange={(e) => handleSimpleChange('phone', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" value={settings.email || ''} onChange={(e) => handleSimpleChange('email', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Whatsapp</label>
              <input type="text" value={settings.whatsapp_number || ''} onChange={(e) => handleSimpleChange('whatsapp_number', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Adresse</label>
              <input type="text" value={settings.address || ''} onChange={(e) => handleSimpleChange('address', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold mb-2">Couleur primaire</label>
              <input type="text" value={settings.primary_color || ''} onChange={(e) => handleSimpleChange('primary_color', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Couleur secondaire</label>
              <input type="text" value={settings.secondary_color || ''} onChange={(e) => handleSimpleChange('secondary_color', e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50">
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
