import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ServiceSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5" id="service">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'خدماتنا التفصيلية' : 'Our Detailed Services'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'حلول برق تك التقنية' : 'Barq Tech Technical Solutions'}
          </h2>
        </div>

        {/* --- Service 1: Web Applications Development --- */}
        <div className="row g-5 mb-5 align-items-center scroll-reveal from-left">
          <div className="col-12">
            <div className="bg-white p-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3">
                  <i className="fa fa-laptop-code text-white"></i>
                </div>
                <h3 className="mb-0">{isAr ? 'تطوير تطبيقات الويب Web Applications Development' : 'Web Applications Development'}</h3>
              </div>
              
              <h5 className="text-primary mb-3">{isAr ? 'الوصف:' : 'Description:'}</h5>
              <p className="mb-4 lead">
                {isAr 
                  ? 'في برق تك، نقوم بتصميم وتطوير تطبيقات ويب عالية الأداء تجمع بين الكفاءة التشغيلية، الأمان المطلق، والتصميم الذي يركز على تجربة المستخدم. بدءً من البوابات الرقمية ومنصات التجارة الإلكترونية وصولاً إلى الحلول البرمجية الضخمة للمؤسسات، نبتكر تطبيقاتٍ صُممت لتقدم أداءً قابلاً للتوسع وتجارب تفاعلية ملهمة عبر مختلف القطاعات. ومن خلال دمج أحدث أطر العمل والتصاميم المتجاوبة، والبنى التحتية القوية، نضمن أن يكون كل حل تقني نقدمه موثوقاً، سهل الوصول، ومتناغماً تماماً مع أهداف أعمالكم.'
                  : 'At Barq Tech, we design and develop high-performance web applications that combine operational efficiency, absolute security, and user-centric design. From digital portals and e-commerce platforms to massive software solutions for enterprises, we create applications designed to provide scalable performance and inspiring interactive experiences across various sectors. By integrating the latest frameworks, responsive designs, and robust infrastructure, we ensure that every technical solution we provide is reliable, accessible, and perfectly aligned with your business goals.'}
              </p>

              <div className="row g-4 mt-2">
                <div className="col-md-6">
                  <h5 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-question-circle me-2 ms-2"></i>
                    {isAr ? 'لماذا يمثل هذا أهمية لأعمالك؟' : 'Why it Matters?'}
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fa fa-check text-primary me-2 ms-2"></i> {isAr ? 'تعزيز تفاعلك مع العملاء عبر تجارب رقمية سلسة.' : 'Enhanced customer interaction through seamless digital experiences.'}</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2 ms-2"></i> {isAr ? 'كفاءة تقديم الخدمات بفعالية قصوى عبر القنوات الرقمية المبتكرة.' : 'Highly effective service delivery through innovative digital channels.'}</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2 ms-2"></i> {isAr ? 'ترسيخ سمعة العلامة التجارية من خلال حلول عصرية ومتجاوبة.' : 'Establishing brand reputation through modern and responsive solutions.'}</li>
                    <li className="mb-2"><i className="fa fa-check text-primary me-2 ms-2"></i> {isAr ? 'النمو المرن والقدرة على توسيع المنصات بما يواكب نمو أعمالكم.' : 'Flexible growth and the ability to expand platforms as your business grows.'}</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-magic me-2 ms-2"></i>
                    {isAr ? 'كيف نصنع الفارق؟ How We Help' : 'How We Help'}
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fa fa-star text-primary me-2 ms-2"></i> {isAr ? 'ربط وتكامل الأنظمة وقواعد البيانات في بيئة موحدة.' : 'Merging applications and databases into a unified environment.'}</li>
                    <li className="mb-2"><i className="fa fa-star text-primary me-2 ms-2"></i> {isAr ? 'تطوير وإدارة واجهات البرمجة لاتصال آمن وقابل للتوسع.' : 'Building and managing APIs for secure and scalable connectivity.'}</li>
                    <li className="mb-2"><i className="fa fa-star text-primary me-2 ms-2"></i> {isAr ? 'أتمتة سير العمل عبر ربط الأنظمة وأتمتة المهام المتكررة.' : 'Streamlining processes by linking systems and automating tasks.'}</li>
                    <li className="mb-2"><i className="fa fa-star text-primary me-2 ms-2"></i> {isAr ? 'التكامل السحابي والمحلي لضمان العمل المشترك والسلس.' : 'Ensuring seamless interoperability between cloud and local systems.'}</li>
                    <li className="mb-2"><i className="fa fa-star text-primary me-2 ms-2"></i> {isAr ? 'تبادل البيانات الفوري لتعزيز وضوح الرؤية وسرعة القرار.' : 'Real-time data flow to enhance visibility and decision-making.'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Service 2: AI Agent --- */}
        <div className="row g-5 mb-5 align-items-center scroll-reveal from-right">
          <div className="col-12">
            <div className="bg-light p-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3">
                  <i className="fa fa-robot text-white"></i>
                </div>
                <h3 className="mb-0">{isAr ? 'وكلاء الذكاء الاصطناعي AI Agent' : 'AI Agent'}</h3>
              </div>
              
              <p className="mb-4 lead">
                {isAr 
                  ? 'في "برق تك"، لا نقدم مجرد "بوتات" للدردشة، بل نصمم وكلاء ذكاء اصطناعي مستقلين AI Agents يمتلكون القدرة على التفكير، التحليل، واتخاذ الإجراءات. هؤلاء الوكلاء هم أنظمة برمجية متطورة تعمل كقوة عاملة رقمية، قادرة على تنفيذ مهام معقدة من البداية إلى النهاية دون تدخل بشري دائم، مما يمنح منشأتك "سرعة البرق" في الأداء.'
                  : 'At "Barq Tech", we don\'t just provide "chatbots", but we design autonomous AI agents (AI Agents) that possess the ability to think, analyze, and take actions. These agents are sophisticated software systems that work as a digital workforce, capable of executing complex tasks from start to finish without permanent human intervention, giving your establishment "lightning speed" in performance.'}
              </p>

              <h5 className="text-primary mb-4">
                <i className="fa fa-magic me-2 ms-2"></i>
                {isAr ? 'كيف نصنع الفارق؟ نحن نبيعك "نتائج":' : 'How We Help? We sell you "results":'}
              </h5>
              
              <div className="row g-4">
                {[
                  {
                    titleAr: '1. تحرير الطاقة البشرية',
                    titleEn: '1. Liberating Human Energy',
                    descAr: 'إيقاف استنزاف موظفيك في المهام الرتيبة؛ يقوم الوكيل بالمهام في ثوانٍ، مما يتيح لفريقك التركيز على الإبداع وبناء العلاقات.',
                    descEn: 'Stopping the drain on your employees in monotonous tasks; the agent performs tasks in seconds, allowing your team to focus on creativity.'
                  },
                  {
                    titleAr: '2. الاستجابة بسرعة الضوء',
                    titleEn: '2. Response at the Speed of Light',
                    descAr: 'القدرة على التوسع اللحظي؛ كل عميل (سواء كان 10 أو 10,000) يحصل على اهتمام كامل وفوري دون زيادة موظفين.',
                    descEn: 'Instant expansion capability; every customer (whether 10 or 10,000) receives full and immediate attention without increasing staff.'
                  },
                  {
                    titleAr: '3. تحويل البيانات إلى قرارات',
                    titleEn: '3. Turning Data into Decisions',
                    descAr: 'جعل الوكيل "عقلاً تحليلياً" يربط البيانات ليخبرك بفرص الربح والعملاء المتوقع مغادرتهم. نحول البيانات الصامتة إلى فرص.',
                    descEn: 'Making the agent an "analytical mind" that connects data to tell you about profit opportunities and churn risks.'
                  },
                  {
                    titleAr: '4. تجربة عملاء "شخصية"',
                    titleEn: '4. "Personal" Customer Experience',
                    descAr: 'كسر حاجز الردود المملة؛ الوكيل يعرف السياق وتفضيلات العميل ويتحدث بلهجة ودودة ترفع الولاء لعلامتك التجارية.',
                    descEn: 'Breaking the barrier of boring responses; the agent knows the context and preferences, speaking in a friendly tone.'
                  }
                ].map((axe, i) => (
                  <div className="col-md-6 col-lg-3" key={i}>
                    <div className="bg-white p-3 rounded shadow-sm h-100">
                      <h6 className="mb-2 text-primary">{isAr ? axe.titleAr : axe.titleEn}</h6>
                      <p className="small mb-0">{isAr ? axe.descAr : axe.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Service 3: AI Process Automation --- */}
        <div className="row g-5 mb-5 align-items-center scroll-reveal from-bottom">
          <div className="col-12">
            <div className="bg-white p-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3">
                  <i className="fa fa-microchip text-white"></i>
                </div>
                <h3 className="mb-0">{isAr ? 'أتمتة العمليات بالذكاء الاصطناعي' : 'AI Process Automation'}</h3>
              </div>
              
              <p className="mb-4 lead">
                {isAr 
                  ? 'في برق تك، نقوم بتحويل العمليات التشغيلية اليدوية والورقية إلى مسارات رقمية ذكية تعمل ذاتياً. ندمج تقنيات الـ AI مع أنظمة شركتك لتمكينها من "إدراك" المهام وتنفيذها دون تدخل بشري. من معالجة الفواتير آلياً، إلى إدارة سلاسل الإمداد وتوظيف البيانات، نحن نصمم حلولاً تجعل شركتك تعمل "بأقل جهد بشري وأعلى دقة رقمية".'
                  : 'At Barq Tech, we transform manual and paper-based operational processes into intelligent self-operating digital pathways. We integrate AI technologies with your company\'s systems to enable them to "perceive" tasks and execute them without human intervention. From automated invoice processing to supply chain management, we design solutions that make your company work with minimal human effort.'}
              </p>

              <div className="row g-4 mt-2">
                <div className="col-md-6">
                  <h5 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-exclamation-circle me-2 ms-2"></i>
                    {isAr ? 'لماذا يمثل هذا أهمية لأعمالك؟' : 'Why it Matters?'}
                  </h5>
                  <p className="small text-muted mb-3">{isAr ? 'في سوق يتسم بالتنافسية العالية مثل السوق السعودي، الأتمتة ليست رفاهية بل ضرورة للبقاء:' : 'In a highly competitive market like the Saudi market, automation is not a luxury but a necessity:'}</p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fa fa-caret-left text-primary me-2 ms-2"></i> {isAr ? 'خفض التكاليف التشغيلية بنسبة تصل إلى 60%.' : 'Reduce operational costs by up to 60%.'}</li>
                    <li className="mb-2"><i className="fa fa-caret-left text-primary me-2 ms-2"></i> {isAr ? 'القضاء على الخطأ البشري وضمان دقة متناهية.' : 'Eliminate human error and ensure extreme accuracy.'}</li>
                    <li className="mb-2"><i className="fa fa-caret-left text-primary me-2 ms-2"></i> {isAr ? 'السرعة الفائقة وتحسين زمن الاستجابة للسوق.' : 'Super speed and improving market response time.'}</li>
                    <li className="mb-2"><i className="fa fa-caret-left text-primary me-2 ms-2"></i> {isAr ? 'التفرغ للاستراتيجية والمهام الإبداعية.' : 'Devoting time to strategy and creative tasks.'}</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5 className="text-primary border-bottom pb-2 mb-3">
                    <i className="fa fa-magic me-2 ms-2"></i>
                    {isAr ? 'كيف نصنع الفارق؟ How We Help' : 'How We Help'}
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fa fa-plus-circle text-primary me-2 ms-2"></i> <strong>{isAr ? 'الأتمتة "المدركة":' : 'Cognitive Automation:'}</strong> {isAr ? 'أنظمتنا تفهم المحتوى وتقرأ العقود والإيميلات.' : 'Our systems understand content and read contracts/emails.'}</li>
                    <li className="mb-2"><i className="fa fa-plus-circle text-primary me-2 ms-2"></i> <strong>{isAr ? 'الربط الشامل:' : 'Comprehensive Linking:'}</strong> {isAr ? 'ربط الأنظمة ERP والمخازن لتتحدث لغة واحدة.' : 'Linking ERP and warehouses to speak one language.'}</li>
                    <li className="mb-2"><i className="fa fa-plus-circle text-primary me-2 ms-2"></i> <strong>{isAr ? 'حلول للسوق السعودي:' : 'Saudi Market Solutions:'}</strong> {isAr ? 'مراعاة متطلبات ZATCA واللغة العربية.' : 'Considering ZATCA and Arabic language requirements.'}</li>
                    <li className="mb-2"><i className="fa fa-plus-circle text-primary me-2 ms-2"></i> <strong>{isAr ? 'التحسين الذاتي:' : 'Self-Improvement:'}</strong> {isAr ? 'مراقبة المسارات والتنبيه لعنق الزجاجة.' : 'Monitoring pathways and alerting for bottlenecks.'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceSection;
