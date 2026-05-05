import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const clientsData = [
  { name: 'Client 1', logo: '/img/client-1.png' },
  { name: 'Client 2', logo: '/img/client-2.png' },
  { name: 'Client 3', logo: '/img/client-3.png' },
  { name: 'Client 4', logo: '/img/client-4.png' },
  { name: 'Client 5', logo: '/img/client-5.png' },
  { name: 'Client 6', logo: '/img/client-6.png' },
];

const ClientSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'شركاء النجاح' : 'Success Partners'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'عملاء نفخر بالعمل معهم' : 'Clients We Are Proud to Work With'}
          </h2>
        </div>
        <div className="row g-4 align-items-center justify-content-center">
          {clientsData.map((client, index) => (
            <div className={`col-6 col-md-4 col-lg-2 scroll-reveal zoom-in`} data-delay={index * 100} key={index}>
              <div className="client-logo-item p-4 text-center grayscale hover-color transition">
                <div className="bg-light p-3 rounded shadow-sm border border-2 border-transparent hover-border-primary">
                   <h5 className="mb-0 text-muted">{client.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientSection;
