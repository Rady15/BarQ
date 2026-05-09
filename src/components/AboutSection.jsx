import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SiteContext } from '../context/SiteContext';

const AboutSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { settings } = useContext(SiteContext);

  return (
    <div className="container-xxl py-5" id="about">
      <div className="container px-lg-5">
        <div className="row g-5">
          <div className="col-lg-6 scroll-reveal from-left" data-delay="100">
            <div className="section-title position-relative mb-4 pb-2">
              <h6 className="position-relative text-primary ps-4">
                {isAr ? 'من نحن' : 'About Us'}
              </h6>
              <h2 className="mt-2">
                {isAr ? 'برق تك.. ' : 'Barq Tech..  '}
              </h2>
            </div>
            <div className="mb-4 text-muted" style={{ lineHeight: '1.9' }}>
              {isAr ? (
                <>
                  <p>{settings.about_text_ar || 'نقدم حلولًا تقنية متكاملة تشمل تطوير المواقع والمتاجر الإلكترونية، الأنظمة الإدارية (ERP)، التحول الرقمي، حلول الذكاء الاصطناعي، الأتمتة، والاستشارات التقنية المصممة لدعم نمو الأعمال.'}</p>
                  <p>{settings.vision_text_ar || 'نحن في برق تك، شركة تقنية سعودية المنشأ، نؤمن أن الذكاء الاصطناعي ليس مجرد أداة، بل هو المحرك الجديد للنمو.'}</p>
                </>
              ) : (
                <>
                  <p>{settings.about_text_en || 'We at Barq Tech, a Saudi-born technology company...'}</p>
                  <p><strong>Vision and Goals:</strong></p>
                  <p>{settings.vision_text_en || 'In commitment to supporting the Kingdom\'s Vision 2030...'}</p>
                </>
              )}
            </div>
            <div className="row g-3">
              <div className="col-sm-6">
                <h6 className="mb-3">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'تطبيقات واقعية' : 'Realistic Applications'}
                </h6>
                <h6 className="mb-0">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'وكلاء ذكيون' : 'Smart Agents'}
                </h6>
              </div>
              <div className="col-sm-6">
                <h6 className="mb-3">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'دقة البرق' : 'Lightning Precision'}
                </h6>
                <h6 className="mb-0">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'ابتكارات رقمية' : 'Digital Innovations'}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <Link className={`btn btn-primary rounded-pill px-4 ${isAr ? 'ms-3' : 'me-3'}`} to="/about">
                {isAr ? 'اقرأ المزيد' : 'Read More'}
              </Link>
              <a className="btn btn-outline-primary btn-square me-3" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-primary btn-square me-3" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-primary btn-square me-3" href="#"><i className="fab fa-instagram"></i></a>
              <a className="btn btn-outline-primary btn-square" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-lg-6 scroll-reveal from-right text-center" data-delay="300">
            <img
              className="img-fluid rounded shadow-sm"
              src="/img/about.png"
              alt="About Bark Tech"
              style={{ maxWidth: '600px', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default AboutSection;
