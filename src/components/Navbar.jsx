import { Link, useLocation } from 'react-router-dom';
import { useStickyNavbar } from '../hooks/useAnimations';

import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const isSticky = useStickyNavbar();
  const location = useLocation();
  const { lang, toggleLanguage } = useLanguage();
  const isAr = lang === 'ar';

  const getNavLinkClass = (path) => {
    return `nav-item nav-link ${location.pathname === path ? 'active' : ''}`;
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${
        isSticky ? 'sticky-top shadow-sm' : ''
      }`}
    >
      <Link to="/" className="navbar-brand p-0">
        {/* Desktop Logo: switches based on sticky */}
        <img src={isSticky ? "/two%20colors.png" : "/white.png"} alt="Bark Tech Logo" className="d-none d-lg-block" />
        {/* Mobile Logo: always colored because navbar background is white or has shadow */}
        <img src="/two%20colors.png" alt="Bark Tech Logo" className="d-lg-none" style={{ maxHeight: '40px' }} />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav mx-auto py-0">
          <Link to="/" className={getNavLinkClass('/')}>
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <Link to="/about" className={getNavLinkClass('/about')}>
            {isAr ? 'من نحن' : 'About'}
          </Link>
          <Link to="/service" className={getNavLinkClass('/service')}>
            {isAr ? 'الخدمات' : 'Service'}
          </Link>
          <Link to="/project" className={getNavLinkClass('/project')}>
            {isAr ? 'المشاريع' : 'Project'}
          </Link>
          <Link to="/contact" className={getNavLinkClass('/contact')}>
            {isAr ? 'اتصل بنا' : 'Contact'}
          </Link>
        </div>
        <div className="navbar-nav">
          <button
            onClick={toggleLanguage}
            className="btn border-0 bg-transparent nav-item nav-link d-flex align-items-center"
            style={{ fontWeight: 'bold', fontSize: '1rem', boxShadow: 'none' }}
          >
            <i className={`fa fa-globe ${isAr ? 'ms-2' : 'me-2'}`}></i>
            {isAr ? 'EN' : 'ع'}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
