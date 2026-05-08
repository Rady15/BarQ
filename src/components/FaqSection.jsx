import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { api } from '../utils/api';

const FaqSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await api.get('/faqs');
        setFaqs(data);
      } catch (err) {
        console.error('Error fetching faqs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (loading || faqs.length === 0) return null;

  return (
    <div className="container-xxl py-5 bg-light">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'الدعم الفني' : 'Support'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
          </h2>
        </div>
        <div className="row g-4 align-items-center">
          {/* Lottie Animation */}
          <div className="col-lg-5 scroll-reveal from-left" data-delay="100">
            <div className="mx-auto" style={{ maxWidth: '300px' }}>
              <DotLottieReact
                src="https://lottie.host/9842d8cc-cc0c-4e56-bca3-3f44fea9efd8/fxmKctxAVj.lottie"
                loop
                autoplay
                style={{ width: '100%' }}
              />
            </div>
          </div>
          {/* FAQ Accordion */}
          <div className="col-lg-7 scroll-reveal from-right" data-delay="200">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item mb-3 rounded border-0 shadow-sm" key={faq.id || index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${index === 0 ? '' : 'collapsed'} rounded-top bg-white`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                      style={{ direction: isAr ? 'rtl' : 'ltr', fontWeight: 'bold' }}
                    >
                      {isAr ? faq.question_ar : faq.question_en}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body" style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
                      {isAr ? faq.answer_ar : faq.answer_en}
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

export default FaqSection;
