import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import WebServiceDetail from '../components/WebServiceDetail';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

const WebService = () => {
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
          title={isAr ? 'تطوير تطبيقات الويب' : 'Web Applications Development'}
          breadcrumb={isAr ? 'تطبيقات الويب' : 'Web Apps'}
          bgImage="/img/services/web.png"
        />
      </div>
      <WebServiceDetail />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default WebService;
