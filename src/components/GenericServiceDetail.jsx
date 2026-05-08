import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';

const GenericServiceDetail = ({ service }) => {
  const { lang } = useLanguage();
  const { settings } = useSite();
  const isAr = lang === 'ar';

  if (!service) return null;

  const results = service.features || [];

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

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="row g-5 align-items-center">
          <div className="col-12">
            <div className="bg-white p-3 p-md-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4 flex-wrap">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3 mb-2">
                  <i className={`fa ${service.icon || 'fa-laptop-code'} text-white`}></i>
                </div>
                <h3 className="mb-2" style={{ fontSize: 'calc(1.1rem + 0.5vw)', color: 'var(--primary)' }}>
                  {isAr ? service.title_ar : service.title_en}
                </h3>
              </div>

              <div 
                className="mb-5 lead"
                dangerouslySetInnerHTML={{ __html: isAr ? service.description_ar : service.description_en }}
              />

              <div className="row g-4">
                {results.filter(f => f.section === 'why').length > 0 && (
                  <div className="col-12">
                    <h4 className="text-primary mb-4 text-center">
                      {isAr ? 'لماذا يمثل هذا أهمية لأعمالك؟' : 'Why it Matters?'}
                    </h4>
                    <div className="row g-4">
                      {results.filter(f => f.section === 'why').map((item, index) => (
                        <div className="col-md-6 col-lg-3" key={item.id}>
                          <div className="p-4 rounded h-100 shadow-hover text-center" style={cardStyle1}>
                            <div className="icon-animated mb-4">
                              <i className={`fa ${item.icon || 'fa-check'} fa-3x text-primary`}></i>
                            </div>
                            <h6 className="mb-2 text-primary">{isAr ? item.title_ar : item.title_en}</h6>
                            <p className="mb-0 small fw-bold text-dark">{isAr ? item.description_ar : item.description_en}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.filter(f => f.section === 'how').length > 0 && (
                  <div className="col-12 mt-5">
                    <h4 className="text-primary mb-4 text-center">
                      {isAr ? 'كيف نصنع الفارق؟ How We Help' : 'How We Help'}
                    </h4>
                    <div className="row g-4">
                      {results.filter(f => f.section === 'how').map((item, index) => (
                        <div className="col-md-6 col-lg-4" key={item.id}>
                          <div className="p-4 rounded h-100 shadow-hover text-center" style={cardStyle2}>
                            <div className="icon-animated mb-4">
                              <i className={`fa ${item.icon || 'fa-link'} fa-3x text-primary`}></i>
                            </div>
                            <h6 className="mb-2 text-primary">{isAr ? item.title_ar : item.title_en}</h6>
                            <p className="mb-0 small fw-bold text-dark">{isAr ? item.description_ar : item.description_en}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="col-12 mt-5">
                  <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                    <div className="row g-0">
                      <div className="col-lg-5 bg-primary p-5 text-white d-flex flex-column justify-content-center">
                        <h4 className="text-white mb-4">{isAr ? 'ابدأ مشروعك معنا اليوم' : 'Start Your Project Today'}</h4>
                        <p className="mb-4">{isAr ? 'فريقنا جاهز لتحويل أفكارك إلى واقع رقمي ملموس. اترك بياناتك وسنتواصل معك خلال أقل من 24 ساعة.' : 'Our team is ready to turn your ideas into digital reality. Leave your details and we will contact you within 24 hours.'}</p>
                        <div className="d-flex align-items-center mb-3">
                          <div className="btn-square bg-white rounded-circle me-3 ms-3">
                            <i className="fa fa-phone-alt text-primary"></i>
                          </div>
                          <span>+966 55 024 3776</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="btn-square bg-white rounded-circle me-3 ms-3">
                            <i className="fa fa-envelope text-primary"></i>
                          </div>
                          <span>grow@barqtech.ai</span>
                        </div>
                      </div>
                      <div className="col-lg-7 p-5 bg-white">
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = {
                            name: e.target.name.value,
                            email: e.target.email.value,
                            phone: e.target.phone.value,
                            subject: isAr ? `طلب خدمة: ${service.title_ar}` : `Service Request: ${service.title_en}`,
                            message: `طلب خدمة سريع من صفحة: ${service.title_ar}`
                          };
                          try {
                            const { api } = await import('../utils/api');
                            await api.post('/messages', formData);
                            alert(isAr ? 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.' : 'Order received successfully! We will contact you soon.');
                            e.target.reset();
                          } catch (err) {
                            alert(isAr ? 'حدث خطأ ما، يرجى المحاولة لاحقاً' : 'Error sending request');
                          }
                        }}>
                          <div className="row g-3">
                            <div className="col-md-6">
                              <input type="text" name="name" className="form-control border-0 bg-light p-3 rounded-pill" placeholder={isAr ? 'الاسم بالكامل' : 'Full Name'} required />
                            </div>
                            <div className="col-md-6">
                              <input type="email" name="email" className="form-control border-0 bg-light p-3 rounded-pill" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} required />
                            </div>
                            <div className="col-12">
                              <input type="text" name="phone" className="form-control border-0 bg-light p-3 rounded-pill" placeholder={isAr ? 'رقم الهاتف' : 'Phone Number'} required />
                            </div>
                            <div className="col-12">
                              <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill shadow-sm mb-3">
                                {isAr ? 'إرسال طلب الخدمة (عبر الموقع)' : 'Submit Service Request (Website)'}
                              </button>
                              <a 
                                href={`https://wa.me/${settings.site_whatsapp?.replace(/\+/g, '') || '966550243776'}?text=${encodeURIComponent(isAr ? `مرحباً برق تك، أريد الاستفسار عن خدمة: ${service.title_ar}` : `Hello Barq Tech, I want to inquire about: ${service.title_en}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-success w-100 py-3 rounded-pill shadow-sm d-flex align-items-center justify-content-center"
                                style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
                              >
                                <i className="fab fa-whatsapp me-2 ms-2 fs-4"></i>
                                {isAr ? 'اطلب عبر الواتساب مباشرة' : 'Order via WhatsApp Directly'}
                              </a>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericServiceDetail;
