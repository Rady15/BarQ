import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';
import VisionMissionSection from '../components/VisionMissionSection';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
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
          title={isAr ? 'من نحن' : 'About Us'} 
          breadcrumb={isAr ? 'عن الشركة' : 'About'} 
        />
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Vision, Mission, Values */}
      <VisionMissionSection />

      {/* Team Section */}
      <TeamSection />

      {/* Footer */}
      <Footer />



      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default About;
