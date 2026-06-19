import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaMoon, FaSun, FaUserShield } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';

function Header({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsAdminLoggedIn(!!token);
  }, []);

  const navItems = [
    { href: '#home', label: t('header.home') || 'Accueil' },
    { href: '#about', label: t('header.about') || 'À propos' },
    { href: '#services', label: t('header.services') || 'Services' },
    { href: '#clients', label: t('header.clients') || 'Clients' },
    { href: '#contact', label: t('header.contact') || 'Contact' },
  ];

  const goToAdmin = () => {
    if (isAdminLoggedIn) {
      navigate('/admin');
    } else {
      navigate('/admin/login');
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white dark:bg-gray-900 shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Ets Supers Services" 
            className="h-12 w-auto object-contain"
            onError={(e) => {
              // Fallback si l'image ne charge pas
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <span class="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  Ets Supers Services
                </span>
              `;
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                scrolled 
                  ? 'text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400' 
                  : 'text-white hover:text-orange-300'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Sélecteur de langue */}
          <LanguageSelector />

          {/* Bouton Thème */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              scrolled 
                ? 'hover:bg-gray-200 dark:hover:bg-gray-700' 
                : 'hover:bg-white/20'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>

          {/* Bouton Admin */}
          <button
            onClick={goToAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors"
          >
            <FaUserShield />
            <span className="hidden sm:inline text-sm font-medium">
              {isAdminLoggedIn ? 'Dashboard' : 'Admin'}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              goToAdmin();
            }}
            className="flex items-center gap-2 w-full px-4 py-2 border-t mt-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaUserShield className="text-orange-600" />
            <span>{isAdminLoggedIn ? 'Dashboard Admin' : 'Connexion Admin'}</span>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;