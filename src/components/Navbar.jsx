import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStickyNavbar } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import { useSite } from '../context/SiteContext';

const Navbar = () => {
  const { services } = useSite();
  const isSticky = useStickyNavbar();
  const location = useLocation();
  const { lang, toggleLanguage } = useLanguage();
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Map services for dropdown
  const servicesDropdown = services.map(s => ({
    name: s.title_ar,
    nameEn: s.title_en,
    path: s.route || `/service/${s.id}`
  }));

  const getNavLinkClass = (path) => {
    return `nav-item nav-link fw-bold ${location.pathname === path ? 'active' : ''}`;
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${isSticky ? 'sticky-top shadow-sm' : ''
          }`}
      >
        <Link to="/" className="navbar-brand p-0">
          <img src={isSticky ? "/two%20colors.png" : "/white.png"} alt="Bark Tech Logo" className="d-none d-lg-block" />
          <img src="/two%20colors.png" alt="Bark Tech Logo" className="d-lg-none" style={{ maxHeight: '40px' }} />
        </Link>

        <button
          className={`navbar-toggler border-0 d-lg-none ${isOpen ? 'active' : ''}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <div className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className="collapse navbar-collapse d-none d-lg-block" id="navbarCollapse">
          <div className="navbar-nav mx-auto py-0">
            <Link to="/" className={getNavLinkClass('/')}>
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <Link to="/about" className={getNavLinkClass('/about')}>
              {isAr ? 'من نحن' : 'About'}
            </Link>
            {/* <a href="/#clients" className="nav-item nav-link fw-bold" onClick={() => {
              if (location.pathname === '/') {
                const el = document.getElementById('clients');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              {isAr ? 'العملاء' : 'Clients'}
            </a> */}

            {/* Desktop Dropdown */}
            <div
              className="nav-item dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Link to="/service" className={`nav-link dropdown-toggle fw-bold ${location.pathname === '/service' ? 'active' : ''}`}>
                {isAr ? 'الخدمات' : 'Services'}
              </Link>
              <div className={`dropdown-menu border-0 shadow-sm m-0 ${showDropdown ? 'show' : ''}`}>
                {servicesDropdown.map((s, i) => (
                  <Link key={i} to={s.path} className="dropdown-item">
                    {isAr ? s.name : s.nameEn}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/project" className={getNavLinkClass('/project')}>
              {isAr ? 'المشاريع' : 'Project'}
            </Link>
            <Link to="/blog" className={getNavLinkClass('/blog')}>
              {isAr ? 'المدونة' : 'Blog'}
            </Link>
            <Link to="/contact" className={getNavLinkClass('/contact')}>
              {isAr ? 'اتصل بنا' : 'Contact'}
            </Link>
          </div>

          <div className="navbar-nav">
            <Link
              to="/admin"
              className="btn border-0 bg-transparent nav-item nav-link d-flex align-items-center"
              style={{ fontWeight: 'bold', fontSize: '1rem', boxShadow: 'none' }}
            >
              <i className="fa fa-user-shield"></i>
            </Link>
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

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''} ${isAr ? 'rtl' : 'ltr'}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between p-4 border-bottom">
          <img src="/two%20colors.png" alt="Bark Tech Logo" style={{ maxHeight: '35px' }} />
          <button className="btn-close" onClick={toggleMenu}></button>
        </div>

        <div className="sidebar-body p-4">
          <div className="navbar-nav w-100">
            <Link to="/" className="nav-link py-3 border-bottom fw-bold fs-4" onClick={toggleMenu}>
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <Link to="/about" className="nav-link py-3 border-bottom fw-bold fs-4" onClick={toggleMenu}>
              {isAr ? 'من نحن' : 'About'}
            </Link>
            {/* <a href="/#clients" className="nav-link py-3 border-bottom fw-bold fs-4" onClick={() => {
              toggleMenu();
              if (location.pathname === '/') {
                setTimeout(() => {
                  const el = document.getElementById('clients');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }
            }}>
              {isAr ? 'العملاء' : 'Clients'}
            </a> */}

            {/* Mobile Dropdown */}
            <div className="mobile-dropdown py-3 border-bottom">
              <div
                className="d-flex align-items-center justify-content-between cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="fw-bold fs-4">{isAr ? 'الخدمات' : 'Services'}</span>
                <i className={`fa fa-chevron-down transition ${showDropdown ? 'rotate-180' : ''}`}></i>
              </div>
              <div className={`mobile-dropdown-content mt-2 ps-3 ${showDropdown ? 'show' : ''}`}>
                {servicesDropdown.map((s, i) => (
                  <Link key={i} to={s.path} className="nav-link py-2 fs-5" onClick={toggleMenu}>
                    <i className="fa fa-angle-left me-2 ms-2 text-primary"></i>
                    {isAr ? s.name : s.nameEn}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/project" className="nav-link py-3 border-bottom fw-bold fs-4" onClick={toggleMenu}>
              {isAr ? 'المشاريع' : 'Project'}
            </Link>
            <Link to="/blog" className="nav-link py-3 border-bottom fw-bold fs-4" onClick={toggleMenu}>
              {isAr ? 'المدونة' : 'Blog'}
            </Link>
            <Link to="/contact" className="nav-link py-3 border-bottom fw-bold fs-4" onClick={toggleMenu}>
              {isAr ? 'اتصل بنا' : 'Contact'}
            </Link>

            <button
              onClick={() => { toggleLanguage(); toggleMenu(); }}
              className="nav-link py-3 border-bottom fw-bold fs-4 text-start bg-transparent border-0 w-100"
            >
              <i className={`fa fa-globe ${isAr ? 'ms-2' : 'me-2'}`}></i>
              {isAr ? 'Switch to English' : 'تحويل للعربية'}
            </button>
            <Link to="/admin" className="nav-link py-3 border-bottom fw-bold fs-4" onClick={toggleMenu}>
              <i className={`fa fa-user-shield ${isAr ? 'ms-2' : 'me-2'}`}></i>
              {isAr ? 'تسجيل الدخول' : 'Login'}
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
