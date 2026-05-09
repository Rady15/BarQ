import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { api, getImageUrl } from '../utils/api';

const ClientSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await api.get('/clients');
        setClients(data);
      } catch (err) {
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  if (loading) return null; // Or a spinner
  if (clients.length === 0) return null;

  const partners = clients.filter(c => c.type === 'partner');
  const regularClients = clients.filter(c => c.type === 'client');

  return (
    <div className="container-xxl py-5 bg-white" id="clients">
      <div className="container px-lg-5">
        
        {/* Success Partners Section */}
        {regularClients.length > 0 && (
          <>
            <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
              <h6 className="position-relative d-inline text-primary ps-4">
                {isAr ? 'شركاء النجاح' : 'Success Partners'}
              </h6>
              <h2 className="mt-2">
                {isAr ? 'أكثر من 50 عميل يثقون في حلولنا التقنية' : 'More than 50 Clients Trust Our Technical Solutions'}
              </h2>
            </div>
            
            <div className="row g-3 g-md-4 align-items-center justify-content-center mb-5">
              {regularClients.map((client, index) => (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2 scroll-reveal zoom-in" data-delay={(index % 10) * 100} key={client.id}>
                  <div className="text-center transition p-2 bg-light rounded shadow-sm d-flex align-items-center justify-content-center hover-scale" style={{ height: '100px' }}>
                    <img 
                      src={getImageUrl(client.logo)} 
                      alt={isAr ? client.name : client.name_en} 
                      className="img-fluid transition filter-grayscale-hover" 
                      style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Partners Section */}
        {partners.length > 0 && (
          <div className="mt-5 pt-5 border-top">
            <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
              <h6 className="position-relative d-inline text-primary ps-4">
                {isAr ? 'شركاؤنا' : 'Our Partners'}
              </h6>
              <h2 className="mt-2">
                {isAr ? 'نتعاون مع الأفضل عالمياً' : 'Collaborating with the World\'s Best'}
              </h2>
            </div>
            
            <div className="row g-3 g-md-4 align-items-center justify-content-center">
              {partners.map((partner, index) => (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2 scroll-reveal zoom-in" data-delay={(index % 10) * 100} key={partner.id}>
                  <div className="text-center transition p-2 bg-light rounded shadow-sm d-flex align-items-center justify-content-center hover-scale" style={{ height: '100px' }}>
                    <img 
                      src={getImageUrl(partner.logo)} 
                      alt={isAr ? partner.name : partner.name_en} 
                      className="img-fluid transition filter-grayscale-hover" 
                      style={{ maxHeight: '70px', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientSection;
