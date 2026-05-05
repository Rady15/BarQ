import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const whyUsData = [
  {
    title: 'تكامل مرن وذكي',
    titleEn: 'Flexible & Smart Integration',
    desc: 'أنظمة قابلة للربط بسهولة مع أدوات التسويق، أنظمة الدفع، وتطبيقات الطرف الثالث.',
    descEn: 'Systems that can be easily linked with marketing tools, payment systems, and third-party applications.',
    icon: 'fa fa-puzzle-piece'
  },
  {
    title: 'دعم فني متواصل',
    titleEn: 'Continuous Tech Support',
    desc: 'طاقم من أفضل المهندسين التقنيين مستعدون لخدمتك دائماً ومتابعة أداء النظام بصفة دورية.',
    descEn: 'A staff of the best technical engineers ready to serve you always and follow up on system performance periodically.',
    icon: 'fa fa-headset'
  },
  {
    title: 'واجهات استخدام بسيطة',
    titleEn: 'Simple User Interfaces',
    desc: 'أنظمة ولوحات تحكم عربية أنيقة وسهلة الاستخدام لأي موظف.',
    descEn: 'Elegant and easy-to-use Arabic systems and control panels for any employee.',
    icon: 'fa fa-desktop'
  },
  {
    title: 'الدقة والاحترافية',
    titleEn: 'Accuracy & Professionalism',
    desc: 'لا ينتهي عملنا حتى نتأكد من رضاك التام، مع ضمان جودة البرمجيات وسرعة التنفيذ.',
    descEn: 'Our work does not end until we are completely satisfied, ensuring software quality and speed of execution.',
    icon: 'fa fa-check-double'
  }
];

const WhyUsSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-light">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'المميزات' : 'Features'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'لماذا برق تك؟' : 'Why Barq Tech?'}
          </h2>
        </div>
        <div className="row g-4">
          {whyUsData.map((item, index) => (
            <div className={`col-lg-4 col-md-6 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 150} key={index}>
              <div className="service-item d-flex flex-column justify-content-center text-center rounded bg-white p-4 h-100 shadow-sm border border-light">
                <div className="service-icon flex-shrink-0 mb-4 mx-auto">
                  <i className={`${item.icon} fa-2x`}></i>
                </div>
                <h5 className="mb-3">{isAr ? item.title : item.titleEn}</h5>
                <p className="m-0" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                  {isAr ? item.desc : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUsSection;
