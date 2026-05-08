import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="error-page" style={{ padding: '120px 0', textAlign: 'center', background: '#f9fafb' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '120px', fontWeight: 900, color: '#082e71', marginBottom: '10px' }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>عذراً، الصفحة غير موجودة</h2>
            <p style={{ color: '#6b7280', marginBottom: '40px', fontSize: '1.1rem' }}>
              يبدو أنك سلكت مساراً غير موجود. ربما تم نقل الصفحة أو حذفها.
            </p>
            <Link to="/" className="btn-primary" style={{ padding: '15px 40px', borderRadius: '50px' }}>
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
