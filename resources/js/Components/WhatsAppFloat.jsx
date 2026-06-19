import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/243991888245?text=Bonjour%20Ets%20Supers%20Services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110 z-50"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}

export default WhatsAppFloat;