import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  {
    name: 'م. فيصل العتيبي',
    nameEn: 'Eng. Faisal Al-Otaibi',
    title: 'المدير التنفيذي، شركة تموين الرياض',
    titleEn: 'CEO, Riyadh Catering Company',
    quote: 'قبل برق تك كنا نضيع 20 ساعة أسبوعيًا على تقارير المبيعات. الآن بوت واتساب يرسل لي تحليل كامل كل صباح الساعة 7. وفرنا راتبين وفوقها قراراتنا صارت أسرع. الدعم حقهم ما ينام.',
    quoteEn: 'Before Barq Tech, we wasted 20 hours a week on sales reports. Now a WhatsApp bot sends me a full analysis every morning at 7. We saved two salaries and our decisions are faster. Their support never sleeps.',
    image: '/img/testimonial-1.jpg'
  },
  {
    name: 'أ. نورة الشهري',
    nameEn: 'Ms. Noura Al-Shehri',
    title: 'مديرة الموارد البشرية، مجموعة حلول التعليم',
    titleEn: 'HR Manager, Education Solutions Group',
    quote: 'نظام فرز السير الذاتية اللي بنوه لنا يقرأ 500 سيرة في 3 دقائق ويطلع لي أفضل 10 مرشحين مع سبب الاختيار. نسبة التوظيف الخاطئ نزلت من 30% إلى 4%.',
    quoteEn: 'The CV screening system they built reads 500 resumes in 3 minutes and gives me the top 10 candidates with reasons. Bad hiring rates dropped from 30% to 4%.',
    image: '/img/testimonial-2.jpg'
  },
  {
    name: 'م. أحمد يوسف',
    nameEn: 'Eng. Ahmed Yousef',
    title: 'CTO، متجر إلكتروني',
    titleEn: 'CTO, E-commerce Store',
    quote: 'وكيل الدردشة حق برق تك يرد على 80% من استفسارات العملاء باللهجة السعودية. تقييم رضا العملاء ارتفع من 3.2 إلى 4.8 خلال شهرين. وفروا علينا توظيف 4 موظفين كول سنتر.',
    quoteEn: 'Barq Tech\'s chat agent answers 80% of customer inquiries in Saudi dialect. Customer satisfaction rose from 3.2 to 4.8 in two months. They saved us from hiring 4 call center staff.',
    image: '/img/testimonial-3.jpg'
  }
];

const TestimonialSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-light">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'آراء العملاء' : 'Testimonials'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'ماذا يقول عملاؤنا عنا؟' : 'What Our Clients Say About Us'}
          </h2>
        </div>
        <div className="row g-4 justify-content-center">
          {testimonials.map((t, index) => (
            <div className={`col-lg-4 col-md-6 scroll-reveal ${index === 0 ? 'from-left' : index === 2 ? 'from-right' : 'from-bottom'}`} data-delay={index * 200} key={index}>
              <div className="testimonial-item bg-white rounded p-4 h-100 shadow-sm border border-light">
                <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                <p style={{ direction: isAr ? 'rtl' : 'ltr' }}>{isAr ? t.quote : t.quoteEn}</p>
                <div className="d-flex align-items-center border-top pt-3">
                  {/* <img className="img-fluid flex-shrink-0 rounded-circle" src={t.image} style={{ width: '50px', height: '50px' }} alt={isAr ? t.name : t.nameEn} /> */}
                  <div className="ps-0 w-100" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    <h6 className="mb-1">{isAr ? t.name : t.nameEn}</h6>
                    <small>{isAr ? t.title : t.titleEn}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
