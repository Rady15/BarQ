import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const challengesData = [
  {
    challenge: 'الأتمتة ليست رفاهية بل ضرورة للبقاء في السوق السعودي',
    challengeEn: 'Automation is not a luxury but a necessity to survive in the Saudi market',
    solution: 'خفص التكاليف التشغيلية: تقليل الاعتماد على التدخل البشري في المهام الروتينية يقلل من تكاليف الأجور والهدر التشغيلي بنسب قد تصل إلى 60%',
    solutionEn: 'Reducing operational costs: Reducing dependence on human intervention in routine tasks reduces wage costs and operational waste by rates that may reach 60%',
  },
  {
    challenge: 'الوقوع في الخطأ البشري المتكرر',
    challengeEn: 'Falling into repetitive human error',
    solution: 'القضاء على الخطأ البشري: الآلة لا تتعب ولا تفقد التركيز؛ مما يضمن دقة متناهية في البيانات والعمليات الحساسة (مثل الحسابات والتدقيق).',
    solutionEn: 'Eliminating human error: The machine does not get tired or lose focus; which ensures extreme accuracy in data and sensitive operations (such as accounting and auditing).',
  },
  {
    challenge: 'بطء زمن الاستجابة للسوق والمتغيرات',
    challengeEn: 'Slow response time to the market and variables',
    solution: 'السرعة الفائقة: ما يستغرق من الموظف ساعات لإنجازه، ينهيه نظام الأتمتة في أجزاء من الثانية، مما يحسن من "زمن الاستجابة" للسوق.',
    solutionEn: 'Super speed: What takes an employee hours to complete, the automation system finishes in fractions of a second, which improves the "response time" to the market.',
  },
  {
    challenge: 'انشغال الكفاءات بالمهام الروتينية المتكررة',
    challengeEn: 'Competencies occupied with repetitive routine tasks',
    solution: 'التفرغ للاستراتيجية: عندما تتولى الأنظمة المهام المتكررة، يتحرر موظفوك للقيام بمهام تتطلب التفكير الإبداعي وبناء الصفقات وتطوير العمل.',
    solutionEn: 'Devoting time to strategy: When systems handle repetitive tasks, your employees are freed to perform tasks that require creative thinking, building deals and developing work.',
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
