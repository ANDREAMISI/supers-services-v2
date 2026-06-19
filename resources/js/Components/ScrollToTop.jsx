import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return isVisible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 bg-orange-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-orange-700 transition-all hover:-translate-y-1 z-50"
    >
      <FaArrowUp className="mx-auto" />
    </button>
  ) : null;
}

export default ScrollToTop;