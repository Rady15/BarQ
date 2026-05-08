import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../utils/api';

const AiAgentServiceDetail = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const allServices = await api.get('/services');
        const currentService = allServices.find(s => s.route === '/service/ai-agents');
        if (currentService) {
          const detail = await api.get(`/services/${currentService.id}`);
          setService(detail);
        }
      } catch (err) {
        console.error('Error fetching service detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, []);

  if (loading || !service) return null;

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
        <div className="row g-5 align-items-center scroll-reveal from-right">
          <div className="col-12">
            <div className="bg-light p-3 p-md-5 rounded shadow-sm">
              <div className="d-flex align-items-center mb-4 flex-wrap">
                <div className="btn-square bg-primary rounded-circle me-3 ms-3 mb-2">
                  <i className={`fa ${service.icon || 'fa-robot'} text-white`}></i>
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
                        <div className={`col-md-6 col-lg-3 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 100} key={item.id}>
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
                        <div className={`col-md-6 col-lg-3 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 100} key={item.id}>
                          <div className="p-4 rounded h-100 shadow-hover text-center" style={cardStyle2}>
                            <div className="icon-animated mb-4">
                              <i className={`fa ${item.icon || 'fa-rocket'} fa-3x text-primary`}></i>
                            </div>
                            <h6 className="mb-2 text-primary">{isAr ? item.title_ar : item.title_en}</h6>
                            <p className="mb-0 small fw-bold text-dark">{isAr ? item.description_ar : item.description_en}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center mt-5">
                <a href={`/contact?subject=${encodeURIComponent(isAr ? 'طلب خدمة وكلاء الذكاء الاصطناعي' : 'AI Agents Service Request')}`} className="btn btn-primary py-3 px-5 rounded-pill shadow-sm">
                  {isAr ? 'اطلب الخدمة الآن' : 'Order This Service Now'}
                  <i className={`fa fa-arrow-${isAr ? 'left' : 'right'} ms-2 me-2`}></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgentServiceDetail;
