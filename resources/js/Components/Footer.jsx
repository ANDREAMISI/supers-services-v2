import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-16 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1 - Entreprise */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ets Supers Services</h3>
            <p className="text-gray-300 text-sm">
              Entreprise congolaise spécialisée dans l'imprimerie, la communication visuelle, 
              la décoration, le nettoyage professionnel et les services généraux.
            </p>
            <div className="mt-4 text-sm text-gray-300">
              <p><strong>RCCM :</strong> CD/KGA/RCCM/20-A-00044</p>
              <p><strong>N° Impôt :</strong> A2042180W</p>
            </div>
          </div>
          
          {/* Colonne 2 - Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-orange-500 transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-orange-500 transition-colors">À propos</a></li>
              <li><a href="#services" className="hover:text-orange-500 transition-colors">Services</a></li>
              <li><a href="#clients" className="hover:text-orange-500 transition-colors">Clients</a></li>
              <li><a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Colonne 3 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>Kananga – RDC</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-orange-500" />
                <span>+243 991 888 245</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-orange-500" />
                <span>contact.supersservices@gmail.com</span>
              </li>
            </ul>
            <a
              href="https://wa.me/243991888245"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>
          
          {/* Colonne 4 - Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="https://wa.me/243991888245" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4 text-center text-gray-400 text-sm">
          <p>© 2026 Ets Supers Services - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;