import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function ServiceForm({ service, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: { fr: '', en: '', ln: '', sw: '' },
    description: { fr: '', en: '', ln: '', sw: '' },
    icon: 'FaPrint',
    is_active: true
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || { fr: '', en: '', ln: '', sw: '' },
        description: service.description || { fr: '', en: '', ln: '', sw: '' },
        icon: service.icon || 'FaPrint',
        is_active: service.is_active !== undefined ? service.is_active : true
      });
    }
  }, [service]);

  const handleChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ln', label: 'Lingala' },
    { code: 'sw', label: 'Kiswahili' }
  ];

  const icons = [
    'FaPrint', 'FaPaintRoller', 'FaBroom', 'FaUtensils', 'FaNetworkWired',
    'FaBuilding', 'FaHandsHelping', 'FaUniversity', 'FaGlobe'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">
            {service ? 'Modifier le service' : 'Nouveau service'}
          </h2>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Titres multilingues */}
          <div>
            <label className="block font-semibold mb-2">Titres</label>
            {languages.map(lang => (
              <div key={lang.code} className="mb-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">{lang.label}</label>
                <input
                  type="text"
                  value={formData.title[lang.code] || ''}
                  onChange={(e) => handleChange('title', lang.code, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder={`Titre en ${lang.label}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Descriptions multilingues */}
          <div>
            <label className="block font-semibold mb-2">Descriptions</label>
            {languages.map(lang => (
              <div key={lang.code} className="mb-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">{lang.label}</label>
                <textarea
                  value={formData.description[lang.code] || ''}
                  onChange={(e) => handleChange('description', lang.code, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  rows="2"
                  placeholder={`Description en ${lang.label}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Icône */}
          <div>
            <label className="block font-semibold mb-2">Icône</label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
            >
              {icons.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          {/* Statut */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-orange-600"
              />
              <span>Actif</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              {service ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm;