import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import ServiceSection from '../components/ServiceSection';
import MethodologySection from '../components/MethodologySection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

const Service = () => {
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid bg-white p-0">
      <Spinner loading={loading} />

      {/* Navbar & Hero */}
      <div className="container-fluid position-relative p-0">
        <Navbar />
        <PageHeader 
          title={isAr ? 'خدماتنا' : 'Our Services'} 
          breadcrumb={isAr ? 'الخدمات' : 'Services'} 
        />
      </div>

      {/* Service Section */}
      <ServiceSection />

      {/* Methodology Section */}
      <MethodologySection />

      {/* Footer */}
      <Footer />


      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default Service;
