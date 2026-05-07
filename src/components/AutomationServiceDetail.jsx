import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AutomationServiceDetail = () => {
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
    { ar: 'خفض التكاليف التشغيلية بنسبة تصل إلى 60%.', en: 'Reduce operational costs by up to 60%.', icon: 'fa-percentage' },
    { ar: 'القضاء على الخطأ البشري وضمان دقة متناهية.', en: 'Eliminate human error and ensure extreme accuracy.', icon: 'fa-bullseye' },
    { ar: 'السرعة الفائقة وتحسين زمن الاستجابة للسوق.', en: 'Super speed and improving market response time.', icon: 'fa-tachometer-alt' },
    { ar: 'التفرغ للاستراتيجية والمهام الإبداعية.', en: 'Devoting time to strategy and creative tasks.', icon: 'fa-lightbulb' }
  ];

  const howWeHelp = [
    { titleAr: 'الأتمتة "المدركة"', titleEn: 'Cognitive Automation', descAr: 'أنظمتنا تفهم المحتوى وتقرأ العقود والإيميلات.', descEn: 'Our systems understand content and read contracts.', icon: 'fa-glasses' },
    { titleAr: 'الربط الشامل', titleEn: 'Comprehensive Linking', descAr: 'ربط الأنظمة ERP والمخازن لتتحدث لغة واحدة.', descEn: 'Linking ERP and warehouses to speak one language.', icon: 'fa-network-wired' },
    { titleAr: 'حلول للسوق السعودي', titleEn: 'Saudi Market Solutions', descAr: 'مراعاة متطلبات ZATCA واللغة العربية.', descEn: 'Considering ZATCA and Arabic language requirements.', icon: 'fa-mosque' },
    { titleAr: 'التحسين الذاتي', titleEn: 'Self-Improvement', descAr: 'مراقبة المسارات والتنبيه لعنق الزجاجة.', descEn: 'Monitoring pathways and alerting for bottlenecks.', icon: 'fa-tools' }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="row g-5 align-items-center scroll-reveal from-bottom">
          <div className="col-12">
            <div className="bg-white p-3 p-md-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4 flex-wrap">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3 mb-2">
                  <i className="fa fa-microchip text-white"></i>
                </div>
                <h3 className="mb-2" style={{ fontSize: 'calc(1.1rem + 0.5vw)', color: 'var(--primary)' }}>
                  {isAr ? 'أتمتة العمليات بالذكاء الاصطناعي' : 'AI Process Automation'}
                </h3>
              </div>
              
              <p className="mb-5 lead">
                {isAr 
                  ? 'في برق تك، نقوم بتحويل العمليات التشغيلية اليدوية والورقية إلى مسارات رقمية ذكية تعمل ذاتياً. ندمج تقنيات الـ AI مع أنظمة شركتك لتمكينها من "إدراك" المهام وتنفيذها دون تدخل بشري. من معالجة الفواتير آلياً، إلى إدارة سلاسل الإمداد وتوظيف البيانات، نحن نصمم حلولاً تجعل شركتك تعمل "بأقل جهد بشري وأعلى دقة رقمية".'
                  : 'At Barq Tech, we transform manual and paper-based operational processes into intelligent self-operating digital pathways. We integrate AI technologies with your company\'s systems to enable them to "perceive" tasks and execute them without human intervention. From automated invoice processing to supply chain management, we design solutions that make your company work with minimal human effort.'}
              </p>

              <div className="row g-4">
                <div className="col-12">
                  <h4 className="text-primary mb-4 text-center">{isAr ? 'لماذا يمثل هذا أهمية لأعمالك؟' : 'Why it Matters?'}</h4>
                  <div className="row g-4">
                    {whyItMatters.map((item, index) => (
                      <div className="col-md-6 col-lg-3" key={index}>
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
                  <h4 className="text-primary mb-4 text-center">{isAr ? 'كيف نصنع الفارق؟ How We Help' : 'How We Help'}</h4>
                  <div className="row g-4">
                    {howWeHelp.map((item, index) => (
                      <div className="col-md-6 col-lg-3" key={index}>
                        <div className="p-4 rounded h-100 shadow-hover text-center" style={cardStyle2}>
                          <div className="icon-animated mb-4">
                            <i className={`fa ${item.icon} fa-3x text-primary`}></i>
                          </div>
                          <h6 className="text-primary mb-2">{isAr ? item.titleAr : item.titleEn}</h6>
                          <p className="mb-0 small fw-bold text-dark">{isAr ? item.descAr : item.descEn}</p>
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

export default AutomationServiceDetail;
