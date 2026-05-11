import React from 'react';

const Maintenance = () => {
  return (
    <div dir="rtl" style={{
      fontFamily: "'Cairo', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: 0,
      background: '#f7faff',
      color: '#082e71',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        padding: '40px',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <img src="/title.png" alt="Logo" style={{ maxWidth: '180px', marginBottom: '30px' }} />
        <h1 style={{ fontSize: '2.2rem', marginBottom: '15px', fontWeight: 800 }}>الموقع قيد الصيانة</h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: 1.6 }}>
          نحن نقوم ببعض التحسينات لنقدم لكم تجربة رقمية أفضل. سنعود للعمل قريباً جداً!
        </p>
        <div style={{ 
          marginTop: '40px', 
          paddingTop: '20px', 
          borderTop: '1px solid #f1f5f9',
          fontWeight: 700,
          color: '#082e71',
          fontSize: '0.9rem'
        }}>
          برق تك - Barq Tech
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
