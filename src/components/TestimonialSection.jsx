import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api, getImageUrl } from '../utils/api';

const TestimonialSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await api.get('/testimonials');
        setTestimonials(data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <div className="container-xxl py-5 bg-light">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'آراء العملاء' : 'Testimonials'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'ماذا يقول عملاؤنا عنا؟' : 'What Our Clients Say About Us'}
          </h2>
        </div>
        <div className="row g-4 justify-content-center">
          {testimonials.map((t, index) => (
            <div className={`col-lg-4 col-md-6 scroll-reveal ${index === 0 ? 'from-left' : index === 2 ? 'from-right' : 'from-bottom'}`} data-delay={index * 200} key={t.id || index}>
              <div className="testimonial-item bg-white rounded p-4 h-100 shadow-sm border border-light">
                <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                <p style={{ direction: isAr ? 'rtl' : 'ltr' }}>{isAr ? t.text_ar : t.text_en}</p>
                <div className="d-flex align-items-center border-top pt-3">
                  {t.image && <img className="img-fluid flex-shrink-0 rounded-circle me-3" src={getImageUrl(t.image)} style={{ width: '50px', height: '50px', objectFit: 'cover' }} alt={isAr ? t.name_ar : t.name_en} />}
                  <div className="ps-0 w-100" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    <h6 className="mb-1">{isAr ? t.name_ar : t.name_en}</h6>
                    <small>{isAr ? t.role_ar : t.role_en}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
