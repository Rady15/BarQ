import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import AboutSection from '../components/AboutSection';
import ChallengeSection from '../components/ChallengeSection';
import ServiceSection from '../components/ServiceSection';
import MethodologySection from '../components/MethodologySection';
import WhyUsSection from '../components/WhyUsSection';
import ClientSection from '../components/ClientSection';
import PortfolioSection from '../components/PortfolioSection';
import FaqSection from '../components/FaqSection';
import TestimonialSection from '../components/TestimonialSection';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Home = () => {
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

        <div className="container-fluid py-5 bg-primary hero-header">
          <div className="container my-5 py-5 px-lg-5">
            <div className="row g-5 py-5">
              <div className="col-lg-6 text-center text-lg-start">
                <h1 className="text-white mb-4 animated zoomIn">
                  {isAr ? 'برق تك | نقود مستقبلك نحو التحول الرقمي الذكي' : 'Barq Tech | Leading Your Future Towards Smart Digital Transformation'}
                </h1>
                <p className="text-white pb-3 animated zoomIn">
                  {isAr ? (
                    'نحن في "برق تك" نحول أفكار أعمالك إلى واقع ملموس من خلال حلول تقنية المعلومات المتكاملة، وأنظمة الأتمتة المتقدمة المعتمدة على الذكاء الاصطناعي، لتسهيل إدارة أعمالك وزيادة إنتاجيتك بكفاءة عالية.'
                  ) : (
                    'At "Barq Tech", we turn your business ideas into reality through integrated IT solutions and advanced AI-driven automation systems, to facilitate your business management and increase your productivity with high efficiency.'
                  )}
                </p>
                <Link
                  to="/contact"
                  className={`btn btn-light py-sm-3 px-sm-5 rounded-pill animated slideInLeft ${isAr ? 'ms-3' : 'me-3'}`}
                >
                  {isAr ? 'احجز استشارة مجانية' : 'Free Consultation'}
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline-light py-sm-3 px-sm-5 rounded-pill animated slideInRight"
                >
                  {isAr ? 'اطلب عرض سعر' : 'Request a Quote'}
                </Link>
              </div>
              <div className="col-lg-6 text-center text-lg-start">
                <DotLottieReact
                  src="https://lottie.host/8b0215a4-f444-4cf3-bcd7-af2ba68ab8b4/MCFezIAnhi.lottie"
                  loop
                  autoplay
                  className="img-fluid animated zoomIn"
                  style={{ transform: 'scale(1.3)' }}
                />
              </div>
            </div>
          </div>
          <StatsSection />
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Challenge Section */}
      <ChallengeSection />

      {/* Service Section */}
      <ServiceSection />

      {/* Methodology Section */}
      <MethodologySection />

      {/* Why Us Section */}
      <WhyUsSection />

      {/* Client Section */}
      <ClientSection />

      {/* Portfolio Section */}
      <PortfolioSection limit={3} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default Home;
