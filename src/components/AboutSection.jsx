import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SiteContext } from '../context/SiteContext';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    let observer;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };

    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer && observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}</span>;
};

const AboutSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const { settings } = useContext(SiteContext);
  
  // Use the exact text requested by the user, but smartly omitting the previously removed vendors.
  const customAboutAr = 'نحن في برق تك، شركة تقنية سعودية المنشأ، نؤمن أن الذكاء الاصطناعي ليس مجرد أداة، بل هو المحرك الجديد للنمو. انطلقنا لنطوع أحدث تقنيات الـ AI لخدمة الشركات الطموحة، محولين الأفكار المعقدة إلى تطبيقات واقعية ووكلاء ذكيين يعملون بدقة البرق. بصفتنا شركاء معتمدين لعمالقة التقنية مثل Odoo، نضمن لك حلولاً برمجية تتوافق مع أعلى المعايير العالمية وبلمسة إبداعية محلية.';
  const customAboutEn = 'We at Barq Tech, a Saudi-born technology company, believe that AI is not just a tool, but the new engine for growth. We set out to adapt the latest AI technologies to serve ambitious companies, transforming complex ideas into realistic applications and intelligent agents that work with the precision of lightning. As certified partners of tech giants like Odoo, we guarantee you software solutions that comply with the highest international standards with a local creative touch.';

  const aboutText = isAr ? customAboutAr : customAboutEn;

  return (
    <div className="container-xxl py-5" id="about" style={{ backgroundColor: '#f6f8fd', overflow: 'hidden' }}>
      <div className="container px-lg-5 py-5">
        
        {/* Top Row: Text + Small Image */}
        <div className="row g-5 mb-5 align-items-stretch">
          
          {/* Column 1: Text */}
          <div className="col-lg-7 scroll-reveal from-left" data-delay="100">
            <div className="h-100 d-flex flex-column justify-content-center">
              <div>
                <div 
                  className="d-inline-block px-4 py-2 mb-4 bg-white fw-bold text-uppercase shadow-sm" 
                  style={{ color: '#1a237e', borderRadius: '50px', letterSpacing: isAr ? '0' : '1px', fontSize: '0.85rem' }}
                >
                  {isAr ? 'عن الشركة' : 'ABOUT COMPANY'}
                </div>
              </div>
              
              <p className="fs-5 mb-5" style={{ color: '#5a6275', lineHeight: '2', textAlign: 'justify' }}>
                {aboutText}
              </p>
              <div className="d-flex align-items-center flex-wrap gap-3 mt-2">
                <a 
                  href="/بروفيل برق-.pdf" 
                  download="بروفايل-برق-تك.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary d-inline-flex align-items-center gap-2 fw-semibold transition hover-scale"
                  style={{ borderRadius: '50px', padding: '14px 32px', backgroundColor: '#3350ff', borderColor: '#3350ff' }}
                >
                  {isAr ? 'عرض بروفايل الشركة' : 'Company Profile'}
                  <i className="fa fa-download" style={{ fontSize: '1rem' }}></i>
                </a>

                {/* Social Media Links */}
                <div className="d-flex align-items-center gap-2" style={{ marginLeft: isAr ? '0' : '10px', marginRight: isAr ? '10px' : '0' }}>
                  <a className="btn btn-square rounded-circle shadow-sm transition hover-scale d-flex align-items-center justify-content-center" href={settings?.facebook || '#'} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#1877F2', color: '#fff', width: '45px', height: '45px' }}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-square rounded-circle shadow-sm transition hover-scale d-flex align-items-center justify-content-center" href={settings?.twitter || '#'} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#000000', color: '#fff', width: '45px', height: '45px' }}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-square rounded-circle shadow-sm transition hover-scale d-flex align-items-center justify-content-center" href={settings?.instagram || '#'} target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff', width: '45px', height: '45px' }}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-square rounded-circle shadow-sm transition hover-scale d-flex align-items-center justify-content-center" href={settings?.linkedin || '#'} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#0A66C2', color: '#fff', width: '45px', height: '45px' }}>
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 2: Small Image */}
          <div className="col-lg-5 scroll-reveal from-right" data-delay="300">
            <div className="position-relative shadow-sm w-100 h-100" style={{ minHeight: '250px', borderRadius: '30px', overflow: 'hidden' }}>
              <img 
                src="https://itqore.themeht.com/wp-content/uploads/2025/07/slide06-700x600.jpg" 
                alt="About Vertical"
                className="img-fluid w-100 h-100 position-absolute top-0 start-0"
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Large Image + Stats Box */}
        <div className="row g-5 align-items-stretch">
          
          {/* Column 1: Large Image */}
          <div className="col-lg-7 scroll-reveal from-bottom" data-delay="400">
            <div className="w-100 position-relative shadow-sm h-100" style={{ minHeight: '280px', borderRadius: '30px', overflow: 'hidden' }}>
              <img 
                src="https://itqore.themeht.com/wp-content/uploads/2025/07/slide02-1200x500.jpg" 
                alt="About Wide"
                className="img-fluid w-100 h-100 position-absolute top-0 start-0"
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>
          
          {/* Column 2: Stats Box */}
          <div className="col-lg-5 scroll-reveal from-bottom" data-delay="500">
            <div className="p-4 p-xl-5 shadow-lg position-relative h-100 d-flex flex-column justify-content-center" style={{ background: '#020617', borderRadius: '30px' }}>
              <div className="d-flex justify-content-around align-items-center text-center">
                <div>
                  <h2 className="text-white fw-bold mb-1" style={{ fontSize: '3rem' }}>
                    <Counter end={42} /><span style={{ color: '#e0e5ff', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '2px' }}>k</span>
                  </h2>
                  <p className="mb-0" style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: '500' }}>
                    {isAr ? 'مشروع مكتمل' : 'Completed Work'}
                  </p>
                </div>
                
                <div className="flex-grow-1">
                  <h2 className="text-white fw-bold mb-1" style={{ fontSize: '3rem' }}>
                    <Counter end={58} /><span style={{ color: '#e0e5ff', fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '2px' }}>+</span>
                  </h2>
                  <p className="mb-0" style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: '500' }}>
                    {isAr ? 'فريق خبراء' : 'Expert Team'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;

