import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const pricingData = [
  {
    name: 'برق شات',
    nameEn: 'Barq Chat',
    price: '9,900 ر.س/شهريًا',
    priceEn: '9,900 SAR/month',
    suitableFor: 'خدمة العملاء والمتاجر',
    suitableForEn: 'Customer Service & Stores',
    delivery: '7 أيام',
    deliveryEn: '7 Days',
    delay: '0.1s'
  },
  {
    name: 'برق داتا',
    nameEn: 'Barq Data',
    price: '24,000 ر.س',
    priceEn: '24,000 SAR',
    suitableFor: 'لوحات تحكم تنبؤية للإدارة',
    suitableForEn: 'Predictive Dashboards for Management',
    delivery: '14 يوم',
    deliveryEn: '14 Days',
    delay: '0.3s',
    featured: true
  },
  {
    name: 'برق المؤسسات',
    nameEn: 'Barq Enterprise',
    price: 'حسب الاحتياج',
    priceEn: 'Custom',
    suitableFor: 'حلول مخصصة + LLM خاص',
    suitableForEn: 'Custom Solutions + Private LLM',
    delivery: '30 يوم',
    deliveryEn: '30 Days',
    delay: '0.6s'
  }
];

const PricingSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'الأسعار' : 'Pricing'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'باقات البدء السريع' : 'Quick Start Packages'}
          </h2>
        </div>
        <div className="row g-4 justify-content-center">
          {pricingData.map((plan, index) => (
            <div className="col-lg-4 col-md-6 wow zoomIn" data-wow-delay={plan.delay} key={index}>
              <div className={`service-item d-flex flex-column text-center rounded bg-light p-4 h-100 ${plan.featured ? 'border border-primary shadow' : ''}`}>
                {plan.featured && (
                  <div className="bg-primary text-white position-absolute top-0 start-50 translate-middle rounded-pill px-3 py-1 mt-3" style={{ zIndex: 1 }}>
                    {isAr ? 'الأكثر طلبًا' : 'Most Popular'}
                  </div>
                )}
                <h4 className="mb-3 mt-4 text-primary">{isAr ? plan.name : plan.nameEn}</h4>
                <h2 className="mb-4">{isAr ? plan.price : plan.priceEn}</h2>
                
                <ul className="list-unstyled text-muted mb-4" style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <li className="mb-3">
                    <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                    <strong>{isAr ? 'المناسب لـ: ' : 'Suitable for: '}</strong>
                    {isAr ? plan.suitableFor : plan.suitableForEn}
                  </li>
                  <li className="mb-3">
                    <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                    <strong>{isAr ? 'التسليم: ' : 'Delivery: '}</strong>
                    {isAr ? plan.delivery : plan.deliveryEn}
                  </li>
                </ul>
                <a href="#contact" className="btn btn-primary px-4 mt-auto mx-auto rounded-pill">
                  {isAr ? 'اطلب الآن' : 'Order Now'}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-12 text-center">
            <div className="alert alert-primary d-inline-block rounded-pill px-4 py-3">
              <strong><i className="fa fa-gift me-2 ms-2"></i></strong>
              {isAr ? 'عرض الإطلاق: استضافة سحابية مجانية 3 أشهر + تدريب فريقك مجانًا' : 'Launch Offer: 3 Months Free Cloud Hosting + Free Team Training'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
