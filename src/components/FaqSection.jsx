import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const faqData = [
  {
    q: 'ما هي خدمات برق تك؟',
    qEn: 'What are Barq Tech\'s services?',
    a: 'نقدم حلولًا تقنية متكاملة تشمل تطوير المواقع والمتاجر الإلكترونية، الأنظمة الإدارية (ERP)، التحول الرقمي، حلول الذكاء الاصطناعي، الأتمتة، والاستشارات التقنية المصممة لدعم نمو الأعمال.',
    aEn: 'We provide integrated technical solutions including web development, e-commerce, ERP systems, digital transformation, AI solutions, automation, and technical consulting designed to support business growth.'
  },
  {
    q: 'من هم العملاء الذين تستهدفهم برق تك؟',
    qEn: 'Who are Barq Tech\'s target clients?',
    a: 'نعمل مع الشركات الناشئة، المؤسسات الصغيرة والمتوسطة، والشركات الكبرى التي تبحث عن تطوير أعمالها رقميًا وتحسين الكفاءة التشغيلية وزيادة المبيعات.',
    aEn: 'We work with startups, SMEs, and large corporations seeking to develop their business digitally, improve operational efficiency, and increase sales.'
  },
  {
    q: 'كيف تساعدنا برق تك في التحول الرقمي؟',
    qEn: 'How does Barq Tech help us in digital transformation?',
    a: 'نقوم بتحليل احتياجات نشاطك التجاري، ثم نصمم حلولًا تقنية ذكية تساعدك على أتمتة العمليات، تحسين الأداء، تقليل التكاليف، ورفع جودة تجربة العملاء.',
    aEn: 'We analyze your business needs, then design smart technical solutions that help you automate processes, improve performance, reduce costs, and raise customer experience quality.'
  },
  {
    q: 'هل تقدمون حلولًا مخصصة حسب نشاط الشركة؟',
    qEn: 'Do you provide custom solutions tailored to business type?',
    a: 'نعم، نؤمن أن كل نشاط تجاري له احتياجاته الخاصة، لذلك نقدم حلولًا مخصصة تناسب أهدافك، مجال عملك، وحجم عملياتك.',
    aEn: 'Yes, we believe every business has unique needs, so we provide customized solutions that suit your goals, field of work, and scale of operations.'
  },
  {
    q: 'ما الفرق بين برق تك والشركات التقنية الأخرى؟',
    qEn: 'What is the difference between Barq Tech and other tech companies?',
    a: 'نحن لا نقدم خدمات تقنية فقط، بل نركز على بناء حلول استراتيجية تعتمد على الابتكار، الذكاء الاصطناعي، وتحقيق نتائج قابلة للقياس تساعدك على النمو الحقيقي.',
    aEn: 'We don\'t just provide technical services; we focus on building strategic solutions based on innovation, AI, and achieving measurable results that help you achieve real growth.'
  },
  {
    q: 'هل يمكنكم تطوير موقع إلكتروني أو متجر احترافي لشركتي؟',
    qEn: 'Can you develop a professional website or store for my company?',
    a: 'بالتأكيد، نقوم بتصميم وتطوير مواقع ومتاجر إلكترونية حديثة، سريعة، ومتوافقة مع محركات البحث لضمان حضور رقمي قوي.',
    aEn: 'Certainly, we design and develop modern, fast, and SEO-compatible websites and e-commerce stores to ensure a strong digital presence.'
  },
  {
    q: 'هل توفرون دعمًا فنيًا بعد تنفيذ المشروع؟',
    qEn: 'Do you provide technical support after project implementation?',
    a: 'نعم، نقدم دعمًا فنيًا مستمرًا وخطط صيانة وتحديث لضمان استقرار الأنظمة وتحقيق أفضل أداء.',
    aEn: 'Yes, we provide ongoing technical support, maintenance, and update plans to ensure system stability and achieve the best performance.'
  },
  {
    q: 'كم تستغرق مدة تنفيذ المشروع؟',
    qEn: 'How long does project execution take?',
    a: 'تعتمد مدة التنفيذ على نوع المشروع وحجمه، لكننا نحرص دائمًا على تقديم جدول زمني واضح وإنجاز العمل بكفاءة عالية.',
    aEn: 'Execution time depends on the project type and size, but we always ensure to provide a clear timeline and complete the work with high efficiency.'
  },
  {
    q: 'هل حلولكم مناسبة للشركات الناشئة؟',
    qEn: 'Are your solutions suitable for startups?',
    a: 'نعم، لدينا خدمات مرنة ومناسبة للشركات الناشئة تساعدها على بناء أساس تقني قوي بتكلفة مدروسة.',
    aEn: 'Yes, we have flexible and suitable services for startups that help them build a strong technical foundation at a studied cost.'
  },
  {
    q: 'كيف يمكنني بدء العمل مع برق تك؟',
    qEn: 'How can I start working with Barq Tech?',
    a: 'يمكنك التواصل معنا مباشرة عبر الموقع أو الواتساب لحجز استشارة أولية، وسنساعدك في تحديد الحل الأنسب لاحتياجاتك.',
    aEn: 'You can contact us directly via the website or WhatsApp to book an initial consultation, and we will help you determine the most suitable solution for your needs.'
  },
  {
    q: 'هل تقدمون خدمات تحسين الظهور في محركات البحث (SEO)؟',
    qEn: 'Do you provide Search Engine Optimization (SEO) services?',
    a: 'نعم، نساعد الشركات على تحسين ظهورها الرقمي عبر استراتيجيات SEO، تحسين المحتوى، وتطوير الأداء التقني للموقع.',
    aEn: 'Yes, we help companies improve their digital visibility through SEO strategies, content optimization, and improving the site\'s technical performance.'
  },
  {
    q: 'لماذا أحتاج إلى الذكاء الاصطناعي في عملي؟',
    qEn: 'Why do I need AI in my business?',
    a: 'يساعد الذكاء الاصطناعي في تحسين الإنتاجية، تحليل البيانات، أتمتة المهام، واتخاذ قرارات أكثر ذكاءً مما يمنحك ميزة تنافسية قوية.',
    aEn: 'AI helps improve productivity, data analysis, task automation, and smarter decision-making, giving you a strong competitive advantage.'
  }
];

const FaqSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-light">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'الدعم الفني' : 'Support'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
          </h2>
        </div>
        <div className="row g-4 align-items-center">
          {/* Lottie Animation */}
          <div className="col-lg-5 scroll-reveal from-left" data-delay="100">
            <div className="mx-auto" style={{ maxWidth: '300px' }}>
              <DotLottieReact
                src="https://lottie.host/9842d8cc-cc0c-4e56-bca3-3f44fea9efd8/fxmKctxAVj.lottie"
                loop
                autoplay
                style={{ width: '100%' }}
              />
            </div>
          </div>
          {/* FAQ Accordion */}
          <div className="col-lg-7 scroll-reveal from-right" data-delay="200">
            <div className="accordion" id="faqAccordion">
              {faqData.map((faq, index) => (
                <div className="accordion-item mb-3 rounded border-0 shadow-sm" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${index === 0 ? '' : 'collapsed'} rounded-top bg-white`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                      style={{ direction: isAr ? 'rtl' : 'ltr', fontWeight: 'bold' }}
                    >
                      {isAr ? faq.q : faq.qEn}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body" style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
                      {isAr ? faq.a : faq.aEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
