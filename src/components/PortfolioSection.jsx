import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const portfolioData = [
  {
    img: '/img/portfolio-1.jpg',
    category: 'قطاع قانوني',
    categoryEn: 'Legal Sector',
    name: 'منصة "مُساعد" للمحاماة',
    nameEn: '"Musaid" Legal Platform',
    desc: 'نموذج LLM + OCR يقرأ العقد ويستخرج البنود الجوهرية والمخاطر في جدول.',
    descEn: 'LLM + OCR model that reads contracts and extracts key clauses and risks into a table.',
    result: 'تقليص الوقت 95%، اكتشاف 3 بنود خطرة كانت تعدي على المراجع البشري.',
    resultEn: '95% time reduction, detected 3 risky clauses missed by human reviewers.',
    delay: '0.1s',
  },
  {
    img: '/img/portfolio-2.jpg',
    category: 'تجارة إلكترونية',
    categoryEn: 'E-commerce',
    name: 'وكيل واتساب "متجر لمسة"',
    nameEn: '"Lamsa Store" WhatsApp Agent',
    desc: 'وكيل ذكاء اصطناعي مربوط مع الشحن و أودو يرد تلقائيًا بحالة الشحنة.',
    descEn: 'AI agent integrated with shipping and Odoo, automatically responding with shipment status.',
    result: '82% من الاستفسارات انحلت بدون تدخل بشري. تقييم CSAT ارتفع 1.6 نقطة.',
    resultEn: '82% of inquiries resolved without human intervention. CSAT rose by 1.6 points.',
    delay: '0.3s',
  },
  {
    img: '/img/portfolio-3.jpg',
    category: 'قطاع صناعي',
    categoryEn: 'Industrial Sector',
    name: 'نظام تنبؤ الطلب لمصانع الأغذية',
    nameEn: 'Demand Prediction for Food Factories',
    desc: 'نموذج ML يحلل المبيعات، المواسم، والطقس ويتوقع الطلب للأسبوع القادم.',
    descEn: 'ML model analyzing sales, seasons, and weather to predict next week\'s demand.',
    result: 'الهدر نزل إلى 6% خلال 90 يوم. توفير 2.3 مليون سنويًا.',
    resultEn: 'Waste dropped to 6% in 90 days. Saved 2.3M annually.',
    delay: '0.6s',
  },
  {
    img: '/img/portfolio-4.jpg',
    category: 'موارد بشرية',
    categoryEn: 'HR',
    name: '"فاحص السير الذاتية" لمجموعة موارد',
    nameEn: '"CV Examiner" for Resources Group',
    desc: 'نظام NLP يقرأ السير الذاتية، يقيمها حسب متطلباتك، ويرسل ملخص لأفضل 20 مرشح.',
    descEn: 'NLP system reading CVs, scoring them based on requirements, and summarizing the top 20 candidates.',
    result: 'زمن التوظيف نزل من 22 يوم إلى 6 أيام.',
    resultEn: 'Hiring time dropped from 22 days to 6 days.',
    delay: '0.1s',
  },
  {
    img: '/img/portfolio-5.jpg',
    category: 'قطاع عقاري',
    categoryEn: 'Real Estate',
    name: 'محرك تسعير العقارات الذكي',
    nameEn: 'Smart Real Estate Pricing Engine',
    desc: 'خوارزمية تحلل أسعار السوق والمواقع والخدمات المحيطة لتقدير سعر العقار بدقة.',
    descEn: 'Algorithm analyzing market prices, locations, and surrounding services to estimate property prices accurately.',
    result: 'دقة تسعير وصلت لـ 94% مقارنة بالتقييم البشري.',
    resultEn: '9ing accuracy reached 94% compared to human appraisal.',
    delay: '0.3s',
  },
  {
    img: '/img/portfolio-6.jpg',
    category: 'قطاع صحي',
    categoryEn: 'Health Sector',
    name: 'نظام التنبؤ بنقص الأدوية',
    nameEn: 'Medicine Shortage Prediction System',
    desc: 'يتنبأ بنقص المخزون الطبي قبل حدوثه بـ 15 يوم بناءً على أنماط الاستهلاك.',
    descEn: 'Predicts medical stock shortages 15 days before they occur based on consumption patterns.',
    result: 'تصفير حالات انقطاع الأدوية الحرجة في 3 مستشفيات.',
    resultEn: 'Zeroed out critical medicine shortage cases in 3 hospitals.',
    delay: '0.6s',
  },
  {
    img: '/img/portfolio-1.jpg',
    category: 'تطوير المواقع',
    categoryEn: 'Web Development',
    name: 'البوابة الرقمية لشركة "أساس" العقارية',
    nameEn: '"Asas" Real Estate Portal',
    desc: 'تطوير موقع عقاري ضخم يدعم العرض ثلاثي الأبعاد والخرائط التفاعلية.',
    descEn: 'Developing a massive real estate website supporting 3D viewing and interactive maps.',
    result: 'زيادة عدد الحجوزات عبر الموقع بنسبة 150%.',
    resultEn: '150% increase in bookings through the website.',
    delay: '0.1s',
  },
  {
    img: '/img/portfolio-2.jpg',
    category: 'أنظمة ERP',
    categoryEn: 'ERP Systems',
    name: 'نظام Odoo لسلسلة مطاعم "لذيذ"',
    nameEn: 'Odoo System for "Lazeez" Chain',
    desc: 'ربط 15 فرعاً بنظام محاسبي ومخزني موحد وتفعيل إدارة المشتريات الآلية.',
    descEn: 'Linking 15 branches with a unified accounting and inventory system and activating automated procurement management.',
    result: 'تقليل الفاقد في المواد الخام بنسبة 25%.',
    resultEn: '25% reduction in raw material waste.',
    delay: '0.3s',
  },
  {
    img: '/img/portfolio-3.jpg',
    category: 'تطبيقات الجوال',
    categoryEn: 'Mobile Apps',
    name: 'تطبيق "وصلني" للتوصيل السريع',
    nameEn: '"Wasalni" Delivery App',
    desc: 'برمجة تطبيق توصيل متكامل (عميل، مندوب، تاجر) مع نظام تتبع لحظي.',
    descEn: 'Programming an integrated delivery app (Client, Driver, Merchant) with a real-time tracking system.',
    result: 'أكثر من 50 ألف عملية تحميل في أول شهرين.',
    resultEn: 'Over 50,000 downloads in the first two months.',
    delay: '0.6s',
  },
  {
    img: '/img/portfolio-4.jpg',
    category: 'الهوية البصرية',
    categoryEn: 'Branding',
    name: 'الهوية التجارية لشركة "مداد" للتقنية',
    nameEn: 'Branding for "Medad" Tech',
    desc: 'تصميم هوية بصرية كاملة تشمل الشعار، المطبوعات، ودليل العلامة التجارية.',
    descEn: 'Designing a complete visual identity including logo, stationery, and brand guidelines.',
    result: 'بناء حضور بصري قوي ساعد في جذب استثمارات أولية.',
    resultEn: 'Building a strong visual presence that helped attract seed investments.',
    delay: '0.1s',
  },
  {
    img: '/img/portfolio-5.jpg',
    category: 'تسويق رقمي',
    categoryEn: 'Digital Marketing',
    name: 'حملة SEO لشركة تأمين كبرى',
    nameEn: 'SEO Campaign for Insurance Co.',
    desc: 'تحسين ظهور الموقع في محركات البحث وإدارة حملات إعلانية مستهدفة.',
    descEn: 'Improving search engine visibility and managing targeted advertising campaigns.',
    result: 'تصدر النتائج الأولى في 20 كلمة بحثية مفتاحية.',
    resultEn: 'Ranking first for 20 key search terms.',
    delay: '0.3s',
  },
  {
    img: '/img/portfolio-6.jpg',
    category: 'استضافة سحابية',
    categoryEn: 'Cloud Hosting',
    name: 'هجرة سحابية لجهة حكومية',
    nameEn: 'Cloud Migration for Gov Entity',
    desc: 'نقل بيانات وأنظمة حساسة إلى سحابة محلية آمنة وفق ضوابط الأمن السيبراني.',
    descEn: 'Migrating sensitive data and systems to a secure local cloud according to cybersecurity regulations.',
    result: 'تحسين سرعة استجابة الأنظمة بنسبة 40% وضمان أمان البيانات.',
    resultEn: '40% improvement in system response speed and guaranteed data security.',
    delay: '0.6s',
  },
];

import { Link } from 'react-router-dom';

const PortfolioSection = ({ limit }) => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const displayData = limit ? portfolioData.slice(0, limit) : portfolioData;

  return (
    <div className="container-xxl py-5 wow fadeIn" id="portfolio" data-wow-delay="0.1s">
      <div className="container px-lg-5">
        <div
          className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'مشاريعنا' : 'Our Projects'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'أحدث المشاريع التي أطلقناها' : 'Recently Launched Projects'}
          </h2>
        </div>
        <div className="row g-4">
          {displayData.map((item, index) => (
            <div
              className="col-lg-4 col-md-6 portfolio-item wow zoomIn"
              key={index}
              data-wow-delay={item.delay}
            >
              <div className="position-relative rounded overflow-hidden">
                <img className="img-fluid w-100" src={item.img} alt={isAr ? item.name : item.nameEn} />
                <div className="portfolio-overlay">
                  <a className="btn btn-light mb-3" href={item.img}>
                    <i className="fa fa-plus fa-2x text-primary"></i>
                  </a>
                  <div className="mt-auto px-4 py-3 bg-dark-50 text-center w-100">
                    <small className="text-white d-block mb-1">
                      <i className="fa fa-folder me-2"></i>
                      {isAr ? item.category : item.categoryEn}
                    </small>
                    <h5 className="text-white mb-2">
                      {isAr ? item.name : item.nameEn}
                    </h5>
                    <p className="text-white-50 small mb-2">{isAr ? item.desc : item.descEn}</p>
                    <div className="bg-primary-transparent rounded p-2">
                      <small className="text-white fw-bold">{isAr ? 'النتيجة: ' : 'Result: '}</small>
                      <small className="text-white">{isAr ? item.result : item.resultEn}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {limit && (
          <div className="text-center mt-5 wow fadeInUp" data-wow-delay="0.1s">
            <Link to="/project" className="btn btn-primary rounded-pill py-3 px-5">
              {isAr ? 'عرض المزيد من المشاريع' : 'View More Projects'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;
