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
        <div className="timeline-container">
          {timelineData.map((step, index) => {
            const isStart = index % 2 === 0;
            return (
              <div className={`timeline-row ${isStart ? 'justify-start' : 'justify-end'} scroll-reveal ${isStart ? 'from-right' : 'from-left'}`} data-delay={index * 150} key={index}>
                <div className="timeline-item">
                  <div className="timeline-dot">
                    <i className={`${step.icon}`}></i>
                  </div>
                  <div className="timeline-content text-start" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    <h3 className="mb-2 text-primary" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{step.step}</h3>
                    <h4 className="mb-3 fw-bold">{isAr ? step.title : step.titleEn}</h4>
                    <p className="m-0 text-muted" style={{ direction: isAr ? 'rtl' : 'ltr', lineHeight: '1.8' }}>
                      {isAr ? step.desc : step.descEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
