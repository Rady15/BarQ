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
              <div className="testimonial-item bg-white rounded-4 p-4 shadow-sm border border-light position-relative overflow-hidden" key={`${t.id}-${index}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '320px' }}>
                <i className={`fa fa-quote-${isAr ? 'left' : 'right'} fa-4x text-primary position-absolute`} style={{ opacity: 0.05, top: '20px', [isAr ? 'left' : 'right']: '20px' }}></i>
                
                <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div className="mb-2" style={{ color: '#ffc107', textAlign: isAr ? 'right' : 'left' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <i className="fa fa-star" key={i}></i>
                    ))}
                  </div>
                  
                  {/* Text area with overflow auto to allow scrolling if text is too long, hiding scrollbar for cleaner look */}
                  <div className="testimonial-text-wrapper" style={{ overflowY: 'auto', flex: 1, paddingRight: isAr ? '0' : '10px', paddingLeft: isAr ? '10px' : '0' }}>
                    <p className="fs-6 fw-normal mb-0" style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left', lineHeight: '1.8', fontStyle: 'italic', color: '#555' }}>
                      "{isAr ? t.text_ar : t.text_en}"
                    </p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mt-3 pt-3 border-top" style={{ direction: isAr ? 'rtl' : 'ltr', flexShrink: 0 }}>
                  {t.image ? (
                    <img className="img-fluid flex-shrink-0 rounded-circle shadow-sm" src={getImageUrl(t.image)} style={{ width: '60px', height: '60px', objectFit: 'cover', marginLeft: isAr ? '1rem' : '0', marginRight: isAr ? '0' : '1rem' }} alt={isAr ? t.name_ar : t.name_en} />
                  ) : (
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px', marginLeft: isAr ? '1rem' : '0', marginRight: isAr ? '0' : '1rem', flexShrink: 0 }}>
                      <i className="fa fa-user text-primary fa-2x"></i>
                    </div>
                  )}
                  <div className="w-100" style={{ textAlign: isAr ? 'right' : 'left', overflow: 'hidden' }}>
                    <h6 className="mb-0 fw-bold text-dark text-truncate">{isAr ? t.name_ar : t.name_en}</h6>
                    <span className="text-primary text-truncate d-block" style={{ fontSize: '0.85rem', fontWeight: '600' }}>{isAr ? t.role_ar : t.role_en}</span>
                    {t.company && <span className="text-muted text-truncate d-block" style={{ fontSize: '0.8rem' }}>{t.company}</span>}
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
