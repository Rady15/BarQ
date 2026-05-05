import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialSection from '../components/TestimonialSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

const Project = () => {
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
          title={isAr ? 'مشاريعنا' : 'Our Projects'} 
          breadcrumb={isAr ? 'المشاريع' : 'Projects'} 
        />
      </div>

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Footer */}
      <Footer />


      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default Project;
