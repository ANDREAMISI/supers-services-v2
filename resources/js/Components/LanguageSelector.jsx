import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'ln', name: 'Lingala' },
    { code: 'sw', name: 'Kiswahili' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    // Forcer le re-render
    window.location.reload();
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language)?.name || 'Français';

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <FaGlobe className="text-orange-600" />
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-gray-200 dark:border-gray-700">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              i18n.language === lang.code ? 'bg-orange-600/10 text-orange-600 font-semibold' : ''
            }`}
          >
            <span>{lang.name}</span>
            {i18n.language === lang.code && (
              <span className="ml-auto text-orange-600">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelector;