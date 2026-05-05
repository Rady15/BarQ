import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const servicesData = [
  {
    icon: 'fa fa-robot fa-2x',
    title: 'أتمتة الأعمال بالذكاء الاصطناعي (AI Automation)',
    titleEn: 'AI Automation',
    description: 'تطوير أنظمة ذكية تنفذ المهام الروتينية نيابة عنك، بدءاً من خدمة العملاء وصولاً إلى إصدار الفواتير والتقارير، مما يقلل الأخطاء البشرية ويرفع الكفاءة.',
    descriptionEn: 'Developing smart systems that perform routine tasks on your behalf, from customer service to invoicing and reporting, reducing human error and raising efficiency.',
    delay: '0.1s',
  },
  {
    icon: 'fa fa-cogs fa-2x',
    title: 'أنظمة تخطيط موارد المؤسسات (ERP & Odoo Solutions)',
    titleEn: 'ERP & Odoo Solutions',
    description: 'توفير نظام واحد يجمع المحاسبة، المبيعات، المخزون، والموارد البشرية في منصة متكاملة. ودّع الفوضى التشغيلية بفضل لوحات تحكم فورية وتقارير شاملة.',
    descriptionEn: 'Providing a single system that combines accounting, sales, inventory, and HR in an integrated platform. Say goodbye to operational chaos with instant dashboards and comprehensive reports.',
    delay: '0.3s',
  },
  {
    icon: 'fa fa-laptop-code fa-2x',
    title: 'تصميم وبرمجة المواقع والتطبيقات',
    titleEn: 'Web & App Development',
    description: 'برمجة مواقع إنترنت متقدمة وتطبيقات جوال (iOS & Android) بواجهات عصرية قائمة على أفضل معايير تجربة المستخدم (UI/UX) لتعزيز وصولك لعملائك.',
    descriptionEn: 'Programming advanced websites and mobile applications (iOS & Android) with modern interfaces based on the best UI/UX standards to enhance your reach to your customers.',
    delay: '0.6s',
  },
  {
    icon: 'fa fa-palette fa-2x',
    title: 'تصميم الهوية البصرية والعلامات التجارية',
    titleEn: 'Visual Identity & Branding',
    description: 'صياغة هوية تجارية مميزة لمشروعك (بما في ذلك تصميم الشعارات) تجعلك تتفوق على منافسيك وتترك انطباعاً لا يُنسى.',
    descriptionEn: 'Crafting a distinctive commercial identity for your project (including logo design) that makes you stand out from your competitors and leave an unforgettable impression.',
    delay: '0.1s',
  },
  {
    icon: 'fa fa-bullhorn fa-2x',
    title: 'التسويق الإلكتروني وتحسين محركات البحث (SEO)',
    titleEn: 'Digital Marketing & SEO',
    description: 'إيصال إعلانك لعملائك المستهدفين بشكل مؤكد وفعال، وتحسين ظهور موقعك ليكون في قمة نتائج محركات البحث.',
    descriptionEn: 'Delivering your ads to your target customers effectively and improving your website\'s visibility to be at the top of search engine results.',
    delay: '0.3s',
  },
  {
    icon: 'fa fa-cloud fa-2x',
    title: 'الاستضافة السحابية وحجز النطاقات',
    titleEn: 'Cloud Hosting & Domains',
    description: 'خدمات استضافة سحابية آمنة وسريعة تضمن استقرار موقعك أو نظامك على مدار الساعة وبأسعار منافسة.',
    descriptionEn: 'Secure and fast cloud hosting services that ensure the stability of your website or system around the clock at competitive prices.',
    delay: '0.6s',
  },
];

const ServiceSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 wow fadeIn" id="service" data-wow-delay="0.1s">
      <div className="container px-lg-5">
        <div
          className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'خدماتنا' : 'Our Services'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'خدمات برق تك' : 'Barq Tech Services'}
          </h2>
        </div>
        <div className="row g-4">
          {servicesData.map((service, index) => (
            <div
              className="col-lg-4 col-md-6 wow zoomIn"
              key={index}
              data-wow-delay={service.delay}
            >
              <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                <div className="service-icon flex-shrink-0">
                  <i className={service.icon}></i>
                </div>
                <h5 className="mb-2">{isAr ? service.title : service.titleEn}</h5>
                <p className="mb-2" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
                  {isAr ? service.description : service.descriptionEn}
                </p>
                <Link className="btn px-3 mt-auto mx-auto" to="/service">
                  {isAr ? 'اقرأ المزيد' : 'Read More'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { servicesData };
export default ServiceSection;
