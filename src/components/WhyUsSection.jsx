import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const whyUsData = [
  {
    title: 'تحرير الطاقة البشرية',
    titleEn: '1. Liberating Human Energy',
    desc: 'نحن نصنع الفارق عبر إيقاف استنزاف موظفيك في المهام الرتيبة. بدلاً من قضاء ساعات في الرد على الإيميلات المتكررة أو إدخال البيانات، يقوم وكيل "برق" بهذه المهام في ثوانٍ، مما يتيح لفريقك التركيز على الإبداع، التخطيط، وبناء العلاقات الإنسانية مع العملاء.',
    descEn: 'We make a difference by stopping the drain on your employees in monotonous tasks. Instead of spending hours responding to repetitive emails or entering data, a "Barq" agent performs these tasks in seconds, allowing your team to focus on creativity, planning, and building human relationships with customers.',
    icon: 'fa fa-users-cog'
  },
  {
    title: 'الاستجابة بسرعة الضوء',
    titleEn: '2. Response at the Speed of Light',
    desc: 'تخيل أن يزور موقعك 10 عملاء أو 10,000 عميل في نفس اللحظة. في الحالة التقليدية، ستنهار الخدمة؛ أما مع وكلائنا الأذكياء، فنحن نصنع الفارق عبر القدرة على التوسع اللحظي. كل عميل سيحصل على اهتمام كامل وفوري وكأنه العميل الوحيد، دون الحاجة لزيادة عدد الموظفين.',
    descEn: 'Imagine 10 customers or 10,000 customers visiting your site at the same moment. In the traditional case, the service would collapse; but with our smart agents, we make a difference through the ability of instant expansion. Every customer will receive full and immediate attention as if they were the only customer, without the need to increase the number of employees.',
    icon: 'fa fa-bolt'
  },
  {
    title: 'تحويل البيانات إلى قرارات',
    titleEn: '3. Turning Data into Decisions',
    desc: 'معظم الشركات تملك بيانات لكنها لا تعرف كيف تستخدمها. نحن نصنع الفارق بجعل الوكيل الذكي "عقلاً تحليلياً"؛ فهو لا يجمع البيانات فحسب، بل يربط بينها ليخبرك: "هذا العميل على وشك مغادرة الخدمة، اقترح عليه هذا العرض الآن". نحن نحول البيانات الصامتة إلى فرص ربحية.',
    descEn: 'Most companies have data but don\'t know how to use it. We make a difference by making the smart agent an "analytical mind"; it doesn\'t just collect data, but connects it to tell you: "This customer is about to leave the service, suggest this offer to them now". We transform silent data into profitable opportunities.',
    icon: 'fa fa-chart-pie'
  },
  {
    title: 'تجربة عملاء "شخصية"',
    titleEn: '4. "Personal" Customer Experience',
    desc: 'نحن نكسر حاجز الردود الآلية المملة. وكلاء برق تك يصنعون الفارق من خلال "السياق"؛ الوكيل يعرف من هو العميل، وماذا اشترى سابقاً، وما هو تفضيله الشخصي، ويتحدث معه بلهجة ودودة وذكية، مما يرفع من ولاء العميل لعلامتك التجارية.',
    descEn: 'We break the barrier of boring automated responses. Barq Tech agents make a difference through "context"; the agent knows who the customer is, what they bought previously, and what their personal preference is, and speaks to them in a friendly and intelligent tone, which increases customer loyalty to your brand.',
    icon: 'fa fa-heart'
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
        <div className="row g-4 align-items-center">
          {/* Lottie Animation */}
          <div className="col-lg-6 scroll-reveal from-left" data-delay="100">
            <div className="mx-auto" style={{ maxWidth: '350px' }}>
              <DotLottieReact
                src="https://lottie.host/b1a49684-af93-4b56-b8e4-3de270e907ac/vQt3ag2Sap.lottie"
                loop
                autoplay
                style={{ width: '100%' }}
              />
            </div>
          </div>
          {/* Features Cards */}
          <div className="col-lg-6">
            <div className="row g-4">
              {whyUsData.map((item, index) => (
                <div className={`col-md-6 scroll-reveal ${index % 2 === 0 ? 'from-right' : 'from-left'}`} data-delay={index * 150} key={index}>
                  <div className="d-flex flex-column justify-content-center text-center rounded bg-white p-4 h-100 shadow-sm border border-light" style={{ transition: '0.3s' }}>
                    <div className="mb-3 mx-auto">
                      <i className={`${item.icon} fa-2x text-primary`}></i>
                    </div>
                    <h5 className="mb-3">{isAr ? item.title : item.titleEn}</h5>
                    <p className="m-0 text-muted" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                      {isAr ? item.desc : item.descEn}
                    </p>
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

export default WhyUsSection;
