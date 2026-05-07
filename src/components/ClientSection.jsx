import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const localClients = [
  { name: 'Client 1', img: '/img/clients/WhatsApp Image 2026-05-07 at 1.27.58 PM.jpeg' },
  { name: 'Client 2', img: '/img/clients/WhatsApp Image 2026-05-07 at 1.28.33 PM.jpeg' },
  { name: 'Client 3', img: '/img/clients/WhatsApp Image 2026-05-07 at 1.29.09 PM.jpeg' },
  { name: 'Client 4', img: '/img/clients/WhatsApp Image 2026-05-07 at 1.29.14 PM.jpeg' },
  { name: 'Client 5', img: '/img/clients/WhatsApp Image 2026-05-07 at 1.34.02 PM.jpeg' },
  { name: 'Client 6', img: '/img/clients/WhatsApp Image 2026-05-07 at 1.49.01 PM.jpeg' },
  { name: 'Client 7', img: '/img/clients/v1.png' },
];

const ClientSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-white">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'شركاء النجاح' : 'Success Partners'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'أكثر من 50 عميل يثقون في حلولنا التقنية' : 'More than 50 Clients Trust Our Technical Solutions'}
          </h2>
        </div>
        
        <div className="row g-4 align-items-center">
          {/* Lottie Animation */}
          <div className="col-lg-12 mb-4 scroll-reveal zoom-in">
            <div className="mx-auto" style={{ maxWidth: '200px' }}>
              <DotLottieReact
                src="https://lottie.host/69c446f6-fb2b-4d1a-a205-ea530ab53a93/htZAphvAz9.lottie"
                loop
                autoplay
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Logos Grid */}
          <div className="col-lg-12">
            <div className="row g-4 align-items-center justify-content-center">
              {localClients.map((client, index) => (
                <div className="col-6 col-md-4 col-lg-3 scroll-reveal zoom-in" data-delay={(index % 10) * 100} key={index}>
                  <div className="client-logo-item p-2 text-center transition">
                    <div className="bg-white p-3 rounded shadow-sm border border-light hover-shadow transition d-flex align-items-center justify-content-center" style={{ height: '120px' }}>
                       <img 
                         src={client.img} 
                         alt={client.name} 
                         className="img-fluid grayscale hover-color" 
                         style={{ maxHeight: '80px', width: 'auto', objectFit: 'contain' }}
                       />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSection;
