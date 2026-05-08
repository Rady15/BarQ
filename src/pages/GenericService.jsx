import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
import GenericServiceDetail from '../components/GenericServiceDetail';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import { api, getImageUrl } from '../utils/api';

const GenericService = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [service, setService] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      setFetching(true);
      try {
        const services = await api.get('/services');
        // Match by full route or just the slug part
        const current = services.find(s => 
          s.route === `/service/${slug}` || 
          s.route === slug ||
          s.id.toString() === slug
        );

        if (current) {
          const detail = await api.get(`/services/${current.id}`);
          setService(detail);
        } else {
          // If not found among dynamic services, it might be one of the hardcoded ones 
          // or truly not found.
          // navigate('/404');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchService();
  }, [slug]);

  if (!fetching && !service) {
    return <div className="text-center py-5">Service Not Found</div>;
  }

  return (
    <div className="container-fluid bg-white p-0">
      <Spinner loading={loading} />
      <div className="container-fluid position-relative p-0">
        <Navbar />
        <PageHeader
          title={isAr ? (service?.title_ar || '') : (service?.title_en || '')}
          breadcrumb={isAr ? (service?.title_ar || 'خدمة') : (service?.title_en || 'Service')}
          bgImage={service?.image ? getImageUrl(service.image) : "/img/services/web.png"}
        />
      </div>
      <GenericServiceDetail service={service} />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default GenericService;
