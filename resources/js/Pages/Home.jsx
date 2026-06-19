import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaPaperPlane, FaStar } from 'react-icons/fa';
import api from '../services/api';

function Home() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', position: '', content: '', rating: 5 });
  const [contactStatus, setContactStatus] = useState(null);
  const [testimonialStatus, setTestimonialStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [settingsRes, servicesRes, testimonialsRes] = await Promise.all([
          api.get('/settings'),
          api.get('/services'),
          api.get('/testimonials'),
        ]);

        setSettings(settingsRes.data);
        setServices(servicesRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error('Erreur chargement public data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const heroTitle = settings?.home_title?.fr || t('home.title');
  const heroSubtitle1 = settings?.home_subtitle?.fr || t('home.subtitle1');
  const heroSubtitle2 = settings?.home_subtitle?.en || t('home.subtitle2');
  const heroDescription = settings?.home_description?.fr || t('home.description');
  const contactPhone = settings?.phone || '+243 991 888 245';
  const contactEmail = settings?.email || 'contact.supersservices@gmail.com';
  const contactAddress = settings?.address || 'Kananga  RDC';

  const iconMap = {
    FaPrint: '',
    FaPaintRoller: '',
    FaBroom: '',
    FaUtensils: '',
    FaNetworkWired: '',
    FaBuilding: '',
    FaHandsHelping: '',
    FaUniversity: '',
    FaGlobe: '',
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus(null);

    try {
      await api.post('/contact', contactForm);
      setContactStatus({ success: true, message: 'Message envoyé avec succès !' });
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setContactStatus({ success: false, message: error.response?.data?.message || "Impossible d'envoyer le message." });
    }
  };

  const handleTestimonialSubmit = async (event) => {
    event.preventDefault();
    setTestimonialStatus(null);

    try {
      await api.post('/testimonials', testimonialForm);
      setTestimonialStatus({ success: true, message: 'Témoignage envoyé, il sera vérifié par l\'administrateur.' });
      setTestimonialForm({ name: '', position: '', content: '', rating: 5 });
    } catch (error) {
      setTestimonialStatus({ success: false, message: error.response?.data?.message || "Impossible d'envoyer le témoignage." });
    }
  };

  return (
    <div>
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl" data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroTitle}</h1>
            <h2 className="text-3xl md:text-5xl text-orange-400 mb-6">
              <span className="text-white text-xl md:text-2xl">{heroSubtitle1}</span> {heroSubtitle2}
            </h2>
            <p className="text-lg mb-8">{heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all text-center">
                {t('home.contactBtn') || 'Nous contacter'}
              </a>
              <a href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`} className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all">
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <img
                src="/images/about.jpg"
                alt="À propos de Ets Supers Services"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/600x400/FE6700/white?text=Ets+Supers+Services';
                }}
              />
            </div>
            <div data-aos="fade-left" className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">À propos de nous</h2>
              <p className="text-gray-700 dark:text-gray-300">Ets Supers Services est une entreprise individuelle de droit congolais créée le 27 août 2020.</p>
              <p className="text-gray-700 dark:text-gray-300">Elle est enregistrée au Registre de Commerce et du Crédit Mobilier (RCCM) sous le numéro : <strong className="text-orange-600 dark:text-orange-400">CD/KGA/RCCM/20-A-00044</strong></p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2"> Communication visuelle</li>
                <li className="flex items-center gap-2"> Impression et reproduction</li>
                <li className="flex items-center gap-2"> Décoration</li>
                <li className="flex items-center gap-2"> Services généraux</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600 dark:text-orange-400">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(loading ? Array.from({ length: 3 }) : services).map((service, index) => {
              if (!service) {
                return (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg animate-pulse" />
                );
              }

              const icon = iconMap[service.icon] || '';

              return (
                <div key={service.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="text-5xl mb-4">{icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{service.title?.fr || 'Service'}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description?.fr || 'Description disponible prochainement.'}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-8">Témoignages</h2>
              <div className="grid gap-6">
                {testimonials.length > 0 ? testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-lg text-gray-900 dark:text-white">{testimonial.name?.fr || 'Utilisateur'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position?.fr || 'Client'}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, index) => <FaStar key={index} />)}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{testimonial.content?.fr || ''}</p>
                  </div>
                )) : (
                  <p className="text-gray-600 dark:text-gray-300">Aucun témoignage publié pour le moment.</p>
                )}
              </div>
            </div>
            <div className="lg:w-1/3 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Laissez un témoignage</h3>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <input
                  type="text"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="text"
                  value={testimonialForm.position}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })}
                  placeholder="Votre fonction ou entreprise"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                <textarea
                  value={testimonialForm.content}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                  placeholder="Votre témoignage"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  required
                />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Note :</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>{rating} étoiles</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                  <FaPaperPlane /> Envoyer
                </button>
                {testimonialStatus && (
                  <p className={`text-sm ${testimonialStatus.success ? 'text-green-600' : 'text-red-600'}`}>{testimonialStatus.message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-600 dark:text-orange-400">Contactez-nous</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-6">Nous sommes disponibles pour vos demandes de devis, partenariats et collaborations professionnelles.</p>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p><strong className="text-orange-600 dark:text-orange-400"> Téléphone :</strong> {contactPhone}</p>
                <p><strong className="text-orange-600 dark:text-orange-400"> Email :</strong> {contactEmail}</p>
                <p><strong className="text-orange-600 dark:text-orange-400"> Adresse :</strong> {contactAddress}</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Votre email"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="Votre téléphone"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                />
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Votre message"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                  rows={5}
                  required
                />
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                  <FaPaperPlane /> Envoyer
                </button>
                {contactStatus && (
                  <p className={`text-sm ${contactStatus.success ? 'text-green-600' : 'text-red-600'}`}>{contactStatus.message}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
