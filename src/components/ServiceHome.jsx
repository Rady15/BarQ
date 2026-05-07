import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ServiceHome = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const services = [
    {
      titleAr: 'تطوير تطبيقات الويب',
      titleEn: 'Web Applications',
      descAr: 'تصميم وتطوير تطبيقات ويب عالية الأداء تجمع بين الكفاءة التشغيلية، الأمان المطلق، والتصميم الذي يركز على تجربة المستخدم.',
      descEn: 'Designing and developing high-performance web applications that combine operational efficiency and absolute security.',
      icon: 'fa-laptop-code',
      link: '/service/web-applications'
    },
    {
      titleAr: 'وكلاء الذكاء الاصطناعي',
      titleEn: 'AI Agents',
      descAr: 'تصميم وكلاء ذكاء اصطناعي مستقلين AI Agents يمتلكون القدرة على التفكير، التحليل، واتخاذ الإجراءات كقوة عاملة رقمية.',
      descEn: 'Designing autonomous AI agents (AI Agents) that possess the ability to think, analyze, and take actions as a digital workforce.',
      icon: 'fa-robot',
      link: '/service/ai-agents'
    },
    {
      titleAr: 'أتمتة العمليات بالذكاء الاصطناعي',
      titleEn: 'AI Process Automation',
      descAr: 'تحويل العمليات التشغيلية اليدوية والورقية إلى مسارات رقمية ذكية تعمل ذاتياً بأقل جهد بشري وأعلى دقة رقمية.',
      descEn: 'Transforming manual and paper-based operational processes into intelligent self-operating digital pathways.',
      icon: 'fa-microchip',
      link: '/service/ai-automation'
    }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'خدماتنا' : 'Our Services'}
          </h6>
          <h2 className="mt-2" style={{ color: 'var(--primary)' }}>
            {isAr ? 'حلول برق تك التقنية' : 'Barq Tech Technical Solutions'}
          </h2>
        </div>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className={`col-lg-4 col-md-6 ${index % 2 === 0 ? 'scroll-reveal from-left' : 'scroll-reveal from-right'}`} key={index} data-delay={index * 100}>
              <div className="service-item d-flex flex-column justify-content-center text-center rounded h-100 p-4">
                <div className="service-icon flex-shrink-0 mb-4 mx-auto">
                  <i className={`fa ${service.icon} fa-2x text-white`}></i>
                </div>
                <h5 className="mb-3">{isAr ? service.titleAr : service.titleEn}</h5>
                <p className="mb-4 small">
                  {isAr ? service.descAr : service.descEn}
                </p>
                <Link to={service.link} className="btn btn-primary px-3 mt-auto mx-auto rounded-pill">
                  {isAr ? 'اقرأ المزيد' : 'Read More'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceHome;
