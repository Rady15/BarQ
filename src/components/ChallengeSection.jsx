import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const challengesData = [
  {
    challenge: 'التحول الرقمي المشتت',
    challengeEn: 'Fragmented Digital Transformation',
    solution: 'نقل أعمالك من الورق والأنظمة المشتتة إلى بيئة رقمية متكاملة.',
    solutionEn: 'Moving your business from paper and fragmented systems to an integrated digital environment.',
  },
  {
    challenge: 'مخاطر أمن المعلومات',
    challengeEn: 'Information Security Risks',
    solution: 'حماية بيانات شركتك وعملائك وفق أعلى معايير الأمان المحلية والدولية.',
    solutionEn: 'Protecting your company and customer data according to the highest local and international security standards.',
  },
  {
    challenge: 'العمليات اليدوية المكررة',
    challengeEn: 'Manual Repetitive Processes',
    solution: 'الأتمتة الذكية: تقليل التدخل البشري في العمليات المتكررة لتسريع الإنجاز.',
    solutionEn: 'Smart Automation: Reducing human intervention in repetitive processes to speed up completion.',
  },
  {
    challenge: 'فوضى الأقسام والبيانات',
    challengeEn: 'Department and Data Chaos',
    solution: 'تحسين الكفاءة: ربط مختلف أقسام الشركة (المشتريات، المبيعات، المحاسبة) بشفافية تامة.',
    solutionEn: 'Improving Efficiency: Linking various company departments (procurement, sales, accounting) with complete transparency.',
  }
];

const ChallengeSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-light">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'التحديات والحلول' : 'Challenges & Solutions'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'لماذا أعمالك تحتاج الذكاء الاصطناعي الآن؟' : 'Why Your Business Needs AI Now?'}
          </h2>
        </div>
        <div className="row g-4">
          {challengesData.map((item, index) => (
            <div className={`col-lg-12 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 200} key={index}>
              <div className="d-flex flex-column flex-md-row align-items-center bg-white rounded shadow-sm overflow-hidden">
                <div className="bg-danger text-white p-4 w-100 text-center text-md-start" style={{ flex: 1, direction: isAr ? 'rtl' : 'ltr' }}>
                  <h6 className="text-white mb-0">
                    <i className="fa fa-times-circle me-2 ms-2"></i>
                    {isAr ? item.challenge : item.challengeEn}
                  </h6>
                </div>
                <div className="bg-primary text-white p-4 w-100 text-center text-md-start" style={{ flex: 1, direction: isAr ? 'rtl' : 'ltr' }}>
                  <h6 className="text-white mb-0">
                    <i className="fa fa-check-circle me-2 ms-2"></i>
                    {isAr ? item.solution : item.solutionEn}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeSection;
