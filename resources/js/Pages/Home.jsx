import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Section Hero avec image de fond */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/images/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl" data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('home.title')}
            </h1>
            <h2 className="text-3xl md:text-5xl text-orange-400 mb-6">
              <span className="text-white text-xl md:text-2xl">{t('home.subtitle1')}</span> {t('home.subtitle2')}
            </h2>
            <p className="text-lg mb-8">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all text-center">
                {t('home.contactBtn') || 'Nous contacter'}
              </a>
              <a href="https://wa.me/243991888245" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all">
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos avec image */}
      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <img 
                src="/images/about.jpg" 
                alt="À propos de Ets Supers Services"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  e.target.src = 'https://placehold.co/600x400/FE6700/white?text=Ets+Supers+Services';
                }}
              />
            </div>
            <div data-aos="fade-left" className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">
                À propos de nous
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Ets Supers Services est une entreprise individuelle de droit congolais créée le 27 août 2020.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Elle est enregistrée au Registre de Commerce et du Crédit Mobilier (RCCM) sous le numéro : 
                <strong className="text-orange-600 dark:text-orange-400"> CD/KGA/RCCM/20-A-00044</strong>
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">✓ Communication visuelle</li>
                <li className="flex items-center gap-2">✓ Impression et reproduction</li>
                <li className="flex items-center gap-2">✓ Décoration</li>
                <li className="flex items-center gap-2">✓ Services généraux</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600 dark:text-orange-400">
            Nos Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🖨️', title: 'Imprimerie', desc: 'Impression sur supports variés, photocopie, photos passeport' },
              { icon: '🎨', title: 'Peinture & Décoration', desc: 'Travaux de peinture, panneaux publicitaires, décoration' },
              { icon: '🧹', title: 'Nettoyage & Entretien', desc: 'Entretien bureaux, dératisation, jardinage' },
              { icon: '🍽️', title: 'Service Traiteur', desc: 'Petit-déjeuner, dîners professionnels, célébrations' },
              { icon: '🌐', title: 'Autres Services', desc: 'Traduction, transport, maintenance informatique' },
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600 dark:text-orange-400">
            Contactez-nous
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8" data-aos="fade-up">
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Nous sommes disponibles pour vos demandes de devis, partenariats et collaborations professionnelles.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p><strong className="text-orange-600 dark:text-orange-400">📞 Téléphone :</strong> +243 991 888 245</p>
                <p><strong className="text-orange-600 dark:text-orange-400">📧 Email :</strong> contact.supersservices@gmail.com</p>
                <p><strong className="text-orange-600 dark:text-orange-400">📍 Adresse :</strong> Kananga – RDC</p>
              </div>
              <div>
                <a href="https://wa.me/243991888245" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors w-full justify-center">
                  <FaWhatsapp /> Contactez-nous sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;