import React from 'react';

const WhatsAppFloat = () => {
  const phoneNumber = '966550243776';
  const message = encodeURIComponent('مرحباً برق تك، أود الاستفسار عن خدماتكم التقنية.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-float shadow-lg d-flex align-items-center justify-content-center transition"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      style={{
        position: 'fixed',
        width: 'clamp(50px, 10vw, 60px)',
        height: 'clamp(50px, 10vw, 60px)',
        bottom: '110px',
        right: '20px',
        backgroundColor: '#25d366',
        color: '#fff',
        borderRadius: '50px',
        textAlign: 'center',
        fontSize: 'clamp(24px, 5vw, 30px)',
        zIndex: '1000',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.backgroundColor = '#128c7e';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = '#25d366';
      }}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppFloat;
