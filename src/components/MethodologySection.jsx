import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const stepsData = [
  {
    stepNum: '01',
    title: 'الأتمتة "المدركة"',
    titleEn: 'Cognitive Automation',
    desc: 'الأتمتة التقليدية تنفذ أوامر ثابتة فقط، أما أتمتة "برق تك" فهي تفهم المحتوى. يمكن لأنظمتنا قراءة العقود، استخراج البيانات من الصور، وفهم سياق الإيميلات لاتخاذ إجراء بناءً عليها.',
    descEn: 'Traditional automation only executes fixed commands, but "Barq Tech" automation understands content. Our systems can read contracts, extract data from images, and understand the context of emails to take action based on them.',
    icon: 'fa fa-brain'
  },
  {
    stepNum: '02',
    title: 'الربط الشامل',
    titleEn: 'Comprehensive Linking',
    desc: 'نحن نصنع الفارق بربط الأنظمة المنفصلة ببعضها. نجعل موقعك، وتطبيقك، ونظام المحاسبة ERP، والمخازن يتحدثون لغة واحدة، مما يخلق تدفقاً سلساً للمعلومات دون انقطاع.',
    descEn: 'We make a difference by linking separate systems together. We make your website, application, ERP accounting system, and warehouses speak one language, creating a smooth flow of information without interruption.',
    icon: 'fa fa-link'
  },
  {
    stepNum: '03',
    title: 'حلول "مفصلة" للسوق السعودي',
    titleEn: 'Tailored Solutions for the Saudi Market',
    desc: 'نراعي في أتمتة العمليات القوانين والأنظمة المحلية (مثل متطلبات هيئة الزكاة والضريبة والجمارك - الفوترة الإلكترونية) واللغة العربية، مما يجعل حلولنا جاهزة للتطبيق فوراً في بيئتك المحلية.',
    descEn: 'We take into account local laws (such as Zakat, Tax and Customs Authority requirements - electronic invoicing) and the Arabic language in process automation, making our solutions ready for immediate application in your local environment.',
    icon: 'fa fa-map-marker-alt'
  },
  {
    stepNum: '04',
    title: 'التحسين الذاتي',
    titleEn: 'Self-Improvement',
    desc: 'أنظمتنا ليست جامدة؛ فهي تراقب المسارات وتقترح عليك طرقاً أفضل لتسريع العمل. إذا وجد النظام "عنق زجاجة" في دورة العمل، ينبهك فوراً ويقدم حلولاً ذكية لتجاوزها.',
    descEn: 'Our systems are not rigid; they monitor pathways and suggest better ways to speed up work. If the system finds a "bottleneck" in the work cycle, it immediately alerts you and provides smart solutions to overcome it.',
    icon: 'fa fa-chart-line'
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
        <div className="timeline-container">
          {stepsData.map((step, index) => {
            const isStart = index % 2 === 0;
            return (
              <div className={`timeline-row ${isStart ? 'justify-start' : 'justify-end'} scroll-reveal ${isStart ? 'from-right' : 'from-left'}`} data-delay={index * 150} key={index}>
                <div className="timeline-item">
                  <div className="timeline-dot">
                    <i className={`${step.icon}`}></i>
                  </div>
                  <div className="timeline-content text-start" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    <h3 className="mb-2 text-primary" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{step.stepNum}</h3>
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

export default MethodologySection;
