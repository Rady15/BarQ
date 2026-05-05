import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
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
              <p><i className="fa fa-map-marker-alt me-3"></i>{isAr ? 'الرياض: حي الملقا' : 'Riyadh: Al Malqa'}</p>
              <p><i className="fa fa-phone-alt me-3"></i>+966 55 024 3776</p>
              <p><i className="fa fa-envelope me-3"></i>grow@barqtech.ai</p>
            </div>
            <div className="d-flex justify-content-center justify-content-md-start pt-2">
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
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
              {[1, 2, 3, 4, 5, 6].map((num) => (
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
            <div className="position-relative w-100">
              <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="text" placeholder={isAr ? 'بريدك الإلكتروني' : 'Your Email'} style={{ height: '48px' }} />
              <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i className="fa fa-paper-plane text-primary fs-4"></i></button>
            </div>
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
