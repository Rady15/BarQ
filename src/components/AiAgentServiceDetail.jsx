import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AiAgentServiceDetail = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const cardStyle1 = {
    backgroundImage: 'url(/img/bg-bottom-hero.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(8, 46, 113, 0.05)',
    border: '1px solid rgba(8, 46, 113, 0.1)',
    transition: 'all 0.3s ease'
  };

  const cardStyle2 = {
    backgroundImage: 'url(/img/bg-bottom.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(8, 46, 113, 0.05)',
    border: '1px solid rgba(8, 46, 113, 0.1)',
    transition: 'all 0.3s ease'
  };

  const results = [
    {
      titleAr: 'تحرير الطاقة البشرية',
      titleEn: 'Liberating Human Energy',
      descAr: 'إيقاف استنزاف موظفيك في المهام الرتيبة؛ يقوم الوكيل بالمهام في ثوانٍ، مما يتيح لفريقك التركيز على الإبداع.',
      descEn: 'Stopping the drain on your employees in monotonous tasks; the agent performs tasks in seconds.',
      icon: 'fa-user-clock'
    },
    {
      titleAr: 'الاستجابة بسرعة الضوء',
      titleEn: 'Response at the Speed of Light',
      descAr: 'القدرة على التوسع اللحظي؛ كل عميل يحصل على اهتمام كامل وفوري دون زيادة موظفين.',
      descEn: 'Instant expansion capability; every customer receives full and immediate attention.',
      icon: 'fa-bolt'
    },
    {
      titleAr: 'تحويل البيانات إلى قرارات',
      titleEn: 'Turning Data into Decisions',
      descAr: 'جعل الوكيل "عقلاً تحليلياً" يربط البيانات ليخبرك بفرص الربح والعملاء المتوقع مغادرتهم.',
      descEn: 'Making the agent an "analytical mind" that connects data to tell you about profit opportunities.',
      icon: 'fa-brain'
    },
    {
      titleAr: 'تجربة عملاء "شخصية"',
      titleEn: 'Personal Customer Experience',
      descAr: 'كسر حاجز الردود المملة؛ الوكيل يعرف السياق وتفضيلات العميل ويتحدث بلهجة ودودة.',
      descEn: 'Breaking the barrier of boring responses; the agent knows the context and preferences.',
      icon: 'fa-smile'
    }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="row g-5 align-items-center scroll-reveal from-right">
          <div className="col-12">
            <div className="bg-light p-3 p-md-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4 flex-wrap">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3 mb-2">
                  <i className="fa fa-robot text-white"></i>
                </div>
                <h3 className="mb-2" style={{ fontSize: 'calc(1.1rem + 0.5vw)', color: 'var(--primary)' }}>
                  {isAr ? 'وكلاء الذكاء الاصطناعي AI Agent' : 'AI Agent'}
                </h3>
              </div>
              
              <p className="mb-5 lead">
                {isAr 
                  ? 'في "برق تك"، لا نقدم مجرد "بوتات" للدردشة، بل نصمم وكلاء ذكاء اصطناعي مستقلين AI Agents يمتلكون القدرة على التفكير، التحليل، واتخاذ الإجراءات. هؤلاء الوكلاء هم أنظمة برمجية متطورة تعمل كقوة عاملة رقمية، قادرة على تنفيذ مهام معقدة من البداية إلى النهاية دون تدخل بشري دائم، مما يمنح منشأتك "سرعة البرق" في الأداء.'
                  : 'At "Barq Tech", we don\'t just provide "chatbots", but we design autonomous AI agents (AI Agents) that possess the ability to think, analyze, and take actions. These agents are sophisticated software systems that work as a digital workforce, capable of executing complex tasks from start to finish without permanent human intervention, giving your establishment "lightning speed" in performance.'}
              </p>

              <h4 className="text-primary mb-4 text-center">
                {isAr ? 'كيف نصنع الفارق؟ نحن نبيعك "نتائج":' : 'How We Help? We sell you "results":'}
              </h4>
              
              <div className="row g-4">
                {results.map((axe, i) => (
                  <div className="col-sm-6 col-lg-3 scroll-reveal zoom-in" data-delay={i * 100} key={i}>
                    <div className="p-4 rounded h-100 shadow-hover text-center" style={i % 2 === 0 ? cardStyle1 : cardStyle2}>
                      <div className="icon-animated mb-4">
                        <i className={`fa ${axe.icon} fa-3x text-primary`}></i>
                      </div>
                      <h6 className="mb-3 text-primary">{isAr ? axe.titleAr : axe.titleEn}</h6>
                      <p className="small mb-0 text-dark fw-bold">{isAr ? axe.descAr : axe.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgentServiceDetail;
