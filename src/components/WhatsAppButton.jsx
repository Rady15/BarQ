import React from 'react';
import { useSite } from '../context/SiteContext';

const WhatsAppButton = () => {
  const { settings } = useSite();
  const phone = settings.site_whatsapp || settings.site_phone || '';
  
  if (!phone) return null;

  // Clean phone number (remove +, spaces, etc. for the link)
  const cleanPhone = phone.replace(/\D/g, '');

  return (
    <a
      href={`https://wa.me/${cleanPhone}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
      <span className="whatsapp-tooltip">تواصل معنا</span>
      
      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 30px;
          left: 30px;
          width: 60px;
          height: 60px;
          background-color: #25d366;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          font-size: 35px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .whatsapp-float:hover {
          transform: scale(1.1);
          color: #fff;
        }
        .whatsapp-tooltip {
          position: absolute;
          right: 70px;
          background: #333;
          color: #fff;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .whatsapp-float:hover .whatsapp-tooltip {
          opacity: 1;
          visibility: visible;
          right: 75px;
        }
        [dir="rtl"] .whatsapp-tooltip {
          right: auto;
          left: 70px;
        }
        [dir="rtl"] .whatsapp-float:hover .whatsapp-tooltip {
          left: 75px;
        }
      `}</style>
    </a>
  );
};

export default WhatsAppButton;
