import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import AiAgentServiceDetail from '../components/AiAgentServiceDetail';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import { api, getImageUrl } from '../utils/api';

const AiAgentService = () => {
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [service, setService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        const services = await api.get('/services');
        const current = services.find(s => s.route === '/service/ai-agents');
        if (current) {
          const detail = await api.get(`/services/${current.id}`);
          setService(detail);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, []);

  return (
    <div className="container-fluid bg-white p-0">
      <Spinner loading={loading} />
      <div className="container-fluid position-relative p-0">
        <Navbar />
        <PageHeader 
          title={isAr ? (service?.title_ar || 'وكلاء الذكاء الاصطناعي') : (service?.title_en || 'AI Agents')} 
          breadcrumb={isAr ? 'الوكلاء' : 'AI Agents'} 
          bgImage={service?.image ? getImageUrl(service.image) : "/img/services/ai.png"}
        />
      </div>
      <AiAgentServiceDetail />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AiAgentService;
