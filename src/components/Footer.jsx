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
          <div className="col-md-6 col-lg-3">
            <img src="/white.png" alt="Bark Tech Logo" style={{ maxHeight: '60px' }} className="mb-4" />
            <p>
              <i className="fa fa-map-marker-alt me-3"></i>{isAr ? 'الرياض: حي الملقا، طريق الملك فهد' : 'Riyadh: Al Malqa, King Fahd Rd'}
            </p>
            <p>
              <i className="fa fa-map-marker-alt me-3"></i>{isAr ? 'جدة: طريق الأمير سلطان، برج الأعمال' : 'Jeddah: Prince Sultan Rd, Business Tower'}
            </p>
            <p>
              <i className="fa fa-phone-alt me-3"></i>+966 55 024 3776
            </p>
            <p>
              <i className="fa fa-envelope me-3"></i>grow@barqtech.ai
            </p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-outline-light btn-social" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-outline-light btn-social" href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a className="btn btn-outline-light btn-social" href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="btn btn-outline-light btn-social" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Popular Links */}
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white mb-4">Popular Links</h5>
            <Link className="btn btn-link" to="/about">
              About Us
            </Link>
            <Link className="btn btn-link" to="/contact">
              Contact Us
            </Link>
            <a className="btn btn-link" href="#">
              Privacy Policy
            </a>
            <a className="btn btn-link" href="#">
              Terms & Condition
            </a>
            <a className="btn btn-link" href="#">
              Career
            </a>
          </div>

          {/* Project Gallery */}
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white mb-4">Project Gallery</h5>
            <div className="row g-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div className="col-4" key={num}>
                  <img
                    className="img-fluid"
                    src={`/img/portfolio-${num}.jpg`}
                    alt={`Project ${num}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-md-6 col-lg-3">
            <h5 className="text-white mb-4">Newsletter | النشرة البريدية</h5>
            <p className="mb-2" style={{ direction: 'rtl' }}>
              اشترك في نشرتنا البريدية للحصول على آخر الأخبار والعروض التقنية من برق تك.
            </p>
            <p className="small text-white-50">
              Subscribe to our newsletter to get the latest tech news and offers from Bark Tech.
            </p>
            <div className="position-relative w-100 mt-3">
              <input
                className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                type="text"
                placeholder="Your Email"
                style={{ height: '48px' }}
              />
              <button
                type="button"
                className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"
              >
                <i className="fa fa-paper-plane text-primary fs-4"></i>
              </button>
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
