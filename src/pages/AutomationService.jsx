import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import AutomationServiceDetail from '../components/AutomationServiceDetail';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

const AutomationService = () => {
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
      <div className="container-fluid position-relative p-0">
        <Navbar />
        <PageHeader 
          title={isAr ? 'أتمتة العمليات بالذكاء الاصطناعي' : 'AI Process Automation'} 
          breadcrumb={isAr ? 'الأتمتة' : 'Automation'} 
          bgImage="/img/services/automation.png"
        />
      </div>
      <AutomationServiceDetail />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AutomationService;
