import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const timelineData = [
  {
    step: '01',
    title: 'تحليل الاحتياجات',
    titleEn: 'Needs Analysis',
    desc: 'اجتماع استشاري لفهم واقع عملك وأهدافك بدقة.',
    descEn: 'A consultative meeting to accurately understand your business reality and goals.',
    icon: 'fa fa-search'
  },
  {
    step: '02',
    title: 'تصميم الحلول',
    titleEn: 'Solution Design',
    desc: 'تصميم الواجهات وبناء هيكلية النظام أو التطبيق ليناسب طبيعة نشاطك.',
    descEn: 'Designing interfaces and building the system or application structure to suit your business nature.',
    icon: 'fa fa-pencil-ruler'
  },
  {
    step: '03',
    title: 'التنفيذ والتطوير',
    titleEn: 'Implementation',
    desc: 'برمجة وتخصيص الحلول التقنية في وقت قياسي وبجودة فائقة.',
    descEn: 'Programming and customizing technical solutions in record time with superior quality.',
    icon: 'fa fa-code'
  },
  {
    step: '04',
    title: 'التدريب والدعم',
    titleEn: 'Training & Support',
    desc: 'تدريب فريق عملك على النظام الجديد، وتقديم صيانة مستمرة بعد الإطلاق.',
    descEn: 'Training your team on the new system and providing continuous maintenance after launch.',
    icon: 'fa fa-user-graduate'
  }
];

const TimelineSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-light overflow-hidden">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'منهجية العمل' : 'Work Methodology'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'رحلة تنفيذ مشروعك معنا' : 'Your Project Execution Journey with Us'}
          </h2>
        </div>
        <div className="row g-0 justify-content-center timeline-container position-relative">
          {/* Central Line */}
          <div className="position-absolute bg-primary d-none d-lg-block" style={{ height: '2px', top: '50%', left: '10%', right: '10%', zIndex: 0 }}></div>
          
          {timelineData.map((item, index) => (
            <div className={`col-lg-3 col-md-6 mb-4 mb-lg-0 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 200} key={index}>
              <div className="timeline-item text-center px-4 position-relative" style={{ zIndex: 1 }}>
                <div className="timeline-icon bg-white border border-primary rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px' }}>
                  <i className={`${item.icon} text-primary fa-2x`}></i>
                </div>
                <div className="timeline-content bg-white p-4 rounded shadow-sm">
                  <h3 className="text-primary mb-2">{item.step}</h3>
                  <h5 className="mb-2">{isAr ? item.title : item.titleEn}</h5>
                  <p className="mb-0 small">{isAr ? item.desc : item.descEn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
