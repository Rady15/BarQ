import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';
import { getImageUrl } from '../utils/api';


const ServiceHome = () => {
  const { lang } = useLanguage();
  const { services } = useSite();
  const isAr = lang === 'ar';

  // Take first 6 services for homepage
  const displayServices = services.slice(0, 6);

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
  };

  const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'خدماتنا' : 'Our Services'}
          </h6>
          <h2 className="mt-2" style={{ color: 'var(--primary)' }}>
            {isAr ? 'حلول برق تك التقنية' : 'Barq Tech Technical Solutions'}
          </h2>
        </div>
        <div className="row g-4">
          {displayServices.map((service, index) => (
            <div className="col-lg-4 col-md-6 scroll-reveal from-bottom" style={{ transitionDelay: `${index * 0.1}s` }} key={service.id}>
              <div className="service-item d-flex flex-column justify-content-center text-center rounded">
                <div className="service-icon flex-shrink-0">
                  <i className={`fa ${service.icon || 'fa-cog'} fa-2x`}></i>
                </div>
                <h5 className="mb-3">{isAr ? service.title_ar : service.title_en}</h5>
                <p>
                  {isAr 
                    ? (service.excerpt_ar || truncate(stripHtml(service.description_ar), 120))
                    : (service.excerpt_en || truncate(stripHtml(service.description_en), 120))
                  }
                </p>
                <Link className="btn px-3 mt-auto mx-auto" to={service.route || `/service/${service.id}`}>
                  {isAr ? 'عرض التفاصيل' : 'View Details'}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {services.length > 6 && (
          <div className="text-center mt-5 scroll-reveal from-bottom">
            <Link to="/service" className="btn btn-primary rounded-pill py-3 px-5">
              {isAr ? 'عرض المزيد من الخدمات' : 'View More Services'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceHome;
