import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const stepsData = [
  {
    stepNum: '01',
    title: 'تحليل الاحتياجات',
    titleEn: 'Needs Analysis',
    desc: 'اجتماع استشاري لفهم واقع عملك وأهدافك بدقة.',
    descEn: 'A consultative meeting to accurately understand your business reality and goals.',
    icon: 'fa fa-search'
  },
  {
    stepNum: '02',
    title: 'تصميم الحلول',
    titleEn: 'Solution Design',
    desc: 'تصميم الواجهات وبناء هيكلية النظام أو التطبيق ليناسب طبيعة نشاطك.',
    descEn: 'Designing interfaces and building the system or application structure to suit your business nature.',
    icon: 'fa fa-laptop-code'
  },
  {
    stepNum: '03',
    title: 'التنفيذ والتطوير',
    titleEn: 'Implementation & Development',
    desc: 'برمجة وتخصيص الحلول التقنية في وقت قياسي وبجودة فائقة.',
    descEn: 'Programming and customizing technical solutions in record time with superior quality.',
    icon: 'fa fa-rocket'
  },
  {
    stepNum: '04',
    title: 'التدريب والدعم الفني',
    titleEn: 'Training & Support',
    desc: 'تدريب فريق عملك على النظام الجديد، وتقديم صيانة مستمرة بعد الإطلاق.',
    descEn: 'Training your team on the new system and providing continuous maintenance after launch.',
    icon: 'fa fa-headset'
  }
];

const MethodologySection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'خطوات العمل' : 'Work Process'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'منهجية عملنا: 4 خطوات للانطلاق خلال 14 يوم' : 'Our Methodology: 4 Steps to Launch in 14 Days'}
          </h2>
        </div>
        <div className="row g-4">
          {stepsData.map((step, index) => (
            <div className={`col-lg-3 col-md-6 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 200} key={index}>
              <div className="service-item d-flex flex-column justify-content-center text-center rounded bg-light p-4 h-100">
                <div className="service-icon flex-shrink-0 mb-4 mx-auto">
                  <i className={`${step.icon} fa-2x`}></i>
                </div>
                <h3 className="mb-3 text-primary">{step.stepNum}</h3>
                <h5 className="mb-3">{isAr ? step.title : step.titleEn}</h5>
                <p className="m-0" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                  {isAr ? step.desc : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MethodologySection;
