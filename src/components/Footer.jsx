import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';
import { api, getImageUrl } from '../utils/api';

const Footer = () => {
  const { lang } = useLanguage();
  const { settings } = useSite();
  const isAr = lang === 'ar';
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.get('/projects');
        setProjects(data.slice(0, 6));
      } catch (err) {
        console.error('Error fetching footer projects:', err);
      }
    };
    fetchProjects();
  }, []);
  
  const siteName = settings.site_name || 'برق تك | Barq Tech';
  const siteEmail = settings.site_email || 'grow@barqtech.ai';
  const sitePhone = settings.site_phone || '+966 55 024 3776';
  const siteAddress = isAr ? (settings.site_address_ar || 'المملكة العربية السعودية، الخبر') : (settings.site_address_en || 'Saudi Arabia, Al Khobar');
  const mapLink = settings.site_map_link || 'https://maps.app.goo.gl/uL98DWCSx767gtjAA?g_st=aw';

  return (
    <div
      className="container-fluid bg-primary text-light footer mt-5 pt-5 scroll-reveal from-bottom"
    >
      <div className="container py-5 px-lg-5">
        <div className="row g-5">
          {/* Get In Touch */}
          <div className="col-md-6 col-lg-3 text-center text-md-start">
            <img src="/white.png" alt="Bark Tech Logo" style={{ maxHeight: '60px' }} className="mb-4" />
            <div className="contact-info">
              <p>
                <i className="fa fa-map-marker-alt me-3"></i>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="text-light">
                  {siteAddress}
                </a>
              </p>
              <p><i className="fa fa-phone-alt me-3"></i><span dir="ltr">{sitePhone}</span></p>
              <p><i className="fa fa-envelope me-3"></i>{siteEmail}</p>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start pt-2">
              {settings.twitter_url && <a className="btn btn-outline-light btn-social" href={settings.twitter_url}><i className="fab fa-twitter"></i></a>}
              {settings.facebook_url && <a className="btn btn-outline-light btn-social" href={settings.facebook_url}><i className="fab fa-facebook-f"></i></a>}
              {settings.linkedin_url && <a className="btn btn-outline-light btn-social" href={settings.linkedin_url}><i className="fab fa-linkedin-in"></i></a>}
              {settings.instagram_url && <a className="btn btn-outline-light btn-social" href={settings.instagram_url}><i className="fab fa-instagram"></i></a>}
            </div>
          </div>

          {/* Popular Links */}
          <div className="col-md-6 col-lg-3 text-center text-md-start">
            <h5 className="text-white mb-4">{isAr ? 'روابط سريعة' : 'Quick Links'}</h5>
            <Link className="btn btn-link text-center text-md-start" to="/about">{isAr ? 'من نحن' : 'About Us'}</Link>
            <Link className="btn btn-link text-center text-md-start" to="/service">{isAr ? 'خدماتنا' : 'Our Services'}</Link>
            <Link className="btn btn-link text-center text-md-start" to="/project">{isAr ? 'مشاريعنا' : 'Our Projects'}</Link>
            <Link className="btn btn-link text-center text-md-start" to="/contact">{isAr ? 'اتصل بنا' : 'Contact Us'}</Link>
          </div>

          {/* Project Gallery */}
          <div className="col-md-6 col-lg-3 d-none d-md-block">
            <h5 className="text-white mb-4">{isAr ? 'معرض المشاريع' : 'Project Gallery'}</h5>
            <div className="row g-2">
              {projects.map((proj) => (
                <div className="col-4" key={proj.id}>
                  <img className="img-fluid rounded" src={getImageUrl(proj.image)} alt={isAr ? proj.title_ar : proj.title_en} style={{ height: '60px', width: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              {projects.length === 0 && [1, 2, 3, 4, 5, 6].map((num) => (
                <div className="col-4" key={num}>
                  <img className="img-fluid rounded" src={`/img/portfolio-${num}.jpg`} alt={`Project ${num}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-md-6 col-lg-3 text-center text-md-start">
            <h5 className="text-white mb-4">{isAr ? 'النشرة البريدية' : 'Newsletter'}</h5>
            <p className="small mb-3">{isAr ? 'اشترك للحصول على آخر التحديثات' : 'Subscribe for latest updates'}</p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              if (!email) return;
              try {
                const res = await api.post('/newsletter/subscribe', { email });
                alert(res.message || (isAr ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!'));
                e.target.reset();
              } catch (err) {
                alert(isAr ? 'حدث خطأ ما، يرجى المحاولة لاحقاً' : 'Something went wrong, please try again later');
              }
            }} className="position-relative w-100">
              <input name="email" className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="email" placeholder={isAr ? 'بريدك الإلكتروني' : 'Your Email'} style={{ height: '48px' }} required />
              <button type="submit" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i className="fa fa-paper-plane text-primary fs-4"></i></button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container px-lg-5">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy;{' '}
              <a className="border-bottom" href="#">
                Bark Tech
              </a>
              , All Rights Reserved. Powered by{' '}
              <a className="border-bottom" href="#">
                برق تك
              </a>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <Link to="/">Home</Link>
                <a href="#">Cookies</a>
                <a href="#">Help</a>
                <a href="#">FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
