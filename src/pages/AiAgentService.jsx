import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import AiAgentServiceDetail from '../components/AiAgentServiceDetail';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

const AiAgentService = () => {
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
          title={isAr ? 'وكلاء الذكاء الاصطناعي' : 'AI Agent'} 
          breadcrumb={isAr ? 'الوكلاء الذكاء الاصطناعي' : 'AI Agents'} 
          bgImage="/img/services/ai.png"
        />
      </div>
      <AiAgentServiceDetail />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AiAgentService;
