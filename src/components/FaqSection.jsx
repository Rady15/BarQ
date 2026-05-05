import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const faqData = [
  {
    q: 'هل الذكاء الاصطناعي آمن على بيانات شركتي؟',
    qEn: 'Is AI secure for my company\'s data?',
    a: 'نعم. كل النماذج نشغلها On-Premise أو على سحابة محلية معتمدة. بياناتك ما تطلع برا الشركة أبدًا.',
    aEn: 'Yes. We run all models On-Premise or on an approved local cloud. Your data never leaves the company.'
  },
  {
    q: 'كم تكلفة بناء نموذج خاص فينا؟',
    qEn: 'How much does it cost to build a custom model?',
    a: 'تعتمد على حجم البيانات والهدف. تبدأ من 45 ألف لمشروع MVP. نعطيك تسعيرة دقيقة بعد ورشة الاكتشاف المجانية.',
    aEn: 'It depends on data volume and objectives. Starting from 45k for an MVP. We give you a precise quote after the free discovery workshop.'
  },
  {
    q: 'هل تحتاج فريق تقني عندي؟',
    qEn: 'Do you need a technical team on my end?',
    a: 'لا. حنا نستلم كل شيء من الصفر. بس نحتاج مدير مشروع من طرفكم ساعة بالأسبوع للمتابعة.',
    aEn: 'No. We handle everything from scratch. We just need a project manager from your side for one hour a week for follow-up.'
  },
  {
    q: 'كم يستغرق التنفيذ؟',
    qEn: 'How long does implementation take?',
    a: 'الشات بوت: 7 أيام. لوحة التحليلات: 14 يوم. النموذج المخصص: 4-6 أسابيع.',
    aEn: 'Chatbot: 7 days. Analytics dashboard: 14 days. Custom model: 4-6 weeks.'
  }
];

const FaqSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-light">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'الدعم الفني' : 'Support'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 wow fadeInUp" data-wow-delay="0.3s">
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
