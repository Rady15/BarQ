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
        
        <div className="marquee-container" dir="ltr">
          {/* We render the content twice to create an infinite seamless loop effect */}
          <div className="marquee-content">
            {[...testimonials, ...testimonials].map((t, index) => (
              <div className="testimonial-item bg-white rounded p-4 h-100 shadow-sm border border-light" key={`${t.id}-${index}`}>
                <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                <p style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
                  {isAr ? t.text_ar : t.text_en}
                </p>
                <div className="d-flex align-items-center border-top pt-3" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                  {t.image ? (
                    <img className="img-fluid flex-shrink-0 rounded-circle" src={getImageUrl(t.image)} style={{ width: '50px', height: '50px', objectFit: 'cover', marginLeft: isAr ? '1rem' : '0', marginRight: isAr ? '0' : '1rem' }} alt={isAr ? t.name_ar : t.name_en} />
                  ) : (
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', marginLeft: isAr ? '1rem' : '0', marginRight: isAr ? '0' : '1rem' }}>
                      <i className="fa fa-user text-primary"></i>
                    </div>
                  )}
                  <div className="w-100" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    <h6 className="mb-1">{isAr ? t.name_ar : t.name_en}</h6>
                    <small>{isAr ? t.role_ar : t.role_en} {t.company ? `- ${t.company}` : ''}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
