import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WebServiceDetail = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const cardStyle1 = {
    backgroundImage: 'url(/img/bg-bottom-hero.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(8, 46, 113, 0.05)',
    border: '1px solid rgba(8, 46, 113, 0.1)',
    transition: 'all 0.3s ease'
  };

  const cardStyle2 = {
    backgroundImage: 'url(/img/bg-bottom.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(8, 46, 113, 0.05)',
    border: '1px solid rgba(8, 46, 113, 0.1)',
    transition: 'all 0.3s ease'
  };

  const whyItMatters = [
    { ar: 'تعزيز تفاعلك مع العملاء عبر تجارب رقمية سلسة.', en: 'Enhanced customer interaction through seamless digital experiences.', icon: 'fa-users' },
    { ar: 'كفاءة تقديم الخدمات بفعالية قصوى عبر القنوات الرقمية المبتكرة.', en: 'Highly effective service delivery through innovative digital channels.', icon: 'fa-chart-line' },
    { ar: 'ترسيخ سمعة العلامة التجارية من خلال حلول عصرية ومتجاوبة.', en: 'Establishing brand reputation through modern and responsive solutions.', icon: 'fa-award' },
    { ar: 'النمو المرن والقدرة على توسيع المنصات بما يواكب نمو أعمالكم.', en: 'Flexible growth and the ability to expand platforms as your business grows.', icon: 'fa-expand-arrows-alt' }
  ];

  const howWeHelp = [
    { ar: 'ربط وتكامل الأنظمة وقواعد البيانات في بيئة موحدة.', en: 'Merging applications and databases into a unified environment.', icon: 'fa-link' },
    { ar: 'تطوير وإدارة واجهات البرمجة لاتصال آمن وقابل للتوسع.', en: 'Building and managing APIs for secure and scalable connectivity.', icon: 'fa-shield-alt' },
    { ar: 'أتمتة سير العمل عبر ربط الأنظمة وأتمتة المهام المتكررة.', en: 'Streamlining processes by linking systems and automating tasks.', icon: 'fa-sync' },
    { ar: 'التكامل السحابي والمحلي لضمان العمل المشترك والسلس.', en: 'Ensuring seamless interoperability between cloud and local systems.', icon: 'fa-cloud' },
    { ar: 'تبادل البيانات الفوري لتعزيز وضوح الرؤية وسرعة القرار.', en: 'Real-time data flow to enhance visibility and decision-making.', icon: 'fa-bolt' }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="row g-5 align-items-center scroll-reveal from-left">
          <div className="col-12">
            <div className="bg-white p-3 p-md-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4 flex-wrap">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3 mb-2">
                  <i className="fa fa-laptop-code text-white"></i>
                </div>
                <h3 className="mb-2" style={{ fontSize: 'calc(1.1rem + 0.5vw)', color: 'var(--primary)' }}>
                  {isAr ? 'تطوير تطبيقات الويب Web Applications Development' : 'Web Applications Development'}
                </h3>
              </div>

              <h5 className="text-primary mb-3">{isAr ? '' : 'Description:'}</h5>
              <p className="mb-5 lead">
                {isAr
                  ? 'في برق تك، نقوم بتصميم وتطوير تطبيقات ويب عالية الأداء تجمع بين الكفاءة التشغيلية، الأمان المطلق، والتصميم الذي يركز على تجربة المستخدم. بدءً من البوابات الرقمية ومنصات التجارة الإلكترونية وصولاً إلى الحلول البرمجية الضخمة للمؤسسات، نبتكر تطبيقاتٍ صُممت لتقدم أداءً قابلاً للتوسع وتجارب تفاعلية ملهمة عبر مختلف القطاعات. ومن خلال دمج أحدث أطر العمل والتصاميم المتجاوبة، والبنى التحتية القوية، نضمن أن يكون كل حل تقني نقدمه موثوقاً، سهل الوصول، ومتناغماً تماماً مع أهداف أعمالكم.'
                  : 'At Barq Tech, we design and develop high-performance web applications that combine operational efficiency, absolute security, and user-centric design. From digital portals and e-commerce platforms to massive software solutions for enterprises, we create applications designed to provide scalable performance and inspiring interactive experiences across various sectors. By integrating the latest frameworks, responsive designs, and robust infrastructure, we ensure that every technical solution we provide is reliable, accessible, and perfectly aligned with your business goals.'}
              </p>

<div className="row g-4">
                  <div className="col-12">
                    <h4 className="text-primary mb-4 text-center">
                      {isAr ? 'لماذا يمثل هذا أهمية لأعمالك؟' : 'Why it Matters?'}
                    </h4>
                    <div className="row g-4">
                      {whyItMatters.map((item, index) => (
                        <div className={`col-md-6 col-lg-3 ${index % 2 === 0 ? 'scroll-reveal from-left' : 'scroll-reveal from-right'}`} data-delay={index * 100} key={index}>
                        <div className="p-4 rounded h-100 shadow-hover text-center" style={cardStyle1}>
                          <div className="icon-animated mb-4">
                            <i className={`fa ${item.icon} fa-3x text-primary`}></i>
                          </div>
                          <p className="mb-0 small fw-bold text-dark">{isAr ? item.ar : item.en}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12 mt-5">
                  <h4 className="text-primary mb-4 text-center">
                    {isAr ? 'كيف نصنع الفارق؟ How We Help' : 'How We Help'}
                  </h4>
<div className="row g-4">
                    {howWeHelp.map((item, index) => (
                        <div className={`col-md-6 col-lg-4 ${index % 2 === 0 ? 'scroll-reveal from-left' : 'scroll-reveal from-right'}`} data-delay={index * 100} key={index}>
                        <div className="p-4 rounded h-100 shadow-hover text-center" style={cardStyle2}>
                          <div className="icon-animated mb-4">
                            <i className={`fa ${item.icon} fa-3x text-primary`}></i>
                          </div>
                          <p className="mb-0 small fw-bold text-dark">{isAr ? item.ar : item.en}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebServiceDetail;
