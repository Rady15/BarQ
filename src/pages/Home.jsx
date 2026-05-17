import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import AboutSection from '../components/AboutSection';
import ChallengeSection from '../components/ChallengeSection';
import ServiceHome from '../components/ServiceHome';
import MethodologySection from '../components/MethodologySection';
import WhyUsSection from '../components/WhyUsSection';
import ClientSection from '../components/ClientSection';
import PortfolioSection from '../components/PortfolioSection';
import FaqSection from '../components/FaqSection';
import LatestBlogSection from '../components/LatestBlogSection';
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
    <div className="container-fluid bg-white p-0" dir={isAr ? 'rtl' : 'ltr'}>
      <Spinner loading={loading} />

      {/* Navbar & Hero */}
      <div className="container-fluid position-relative p-0">
        <Navbar />

        <div className="container-fluid py-5 hero-header">
          <div className="container my-5 py-5 px-lg-5">
            <div className="row g-5 py-5 align-items-center">
              <div className="col-lg-10 mx-auto text-center">
                <h1 className="text-white mb-4 animated zoomIn" style={{ fontSize: 'calc(2.2rem + 1.8vw)', fontWeight: 900, textShadow: '0 4px 15px rgba(0, 0, 0, 0.4)' }}>
                  {isAr ? 'برق تك..' : 'Barq Tech..'}
                </h1>
                <p className="text-white pb-4 animated zoomIn" style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: '1.8', textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)', maxWidth: '900px', margin: '0 auto' }}>
                  {isAr ? (
                    'نحوّل طموحك الرقمي إلى نتائج حقيقية. في برق تك، نقدم حلولًا تقنية ذكية تجمع بين الذكاء الاصطناعي، التحول الرقمي، وتطوير الأعمال لنساعد شركتك على النمو بسرعة، رفع الكفاءة، وبناء مستقبل أكثر قوة. من المواقع والأنظمة إلى الاستراتيجيات الرقمية المتقدمة — نحن شريكك التقني لصناعة نجاح يسبق المنافسة.'
                  ) : (
                    'We transform your digital ambition into real results. At Barq Tech, we provide smart technical solutions that combine artificial intelligence, digital transformation, and business development to help your company grow rapidly, increase efficiency, and build a more powerful future. From websites and systems to advanced digital strategies — we are your technical partner for crafting success that leads the competition.'
                  )}
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center">
                  <Link
                    to="/contact"
                    className={`btn btn-light py-sm-3 px-sm-5 rounded-pill animated slideInLeft mb-3 mb-sm-0 ${isAr ? 'ms-sm-3' : 'me-sm-3'}`}
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
              </div>
            </div>
          </div>
          <StatsSection />
        </div>
      </div>

      {/* Client Section */}
      <ClientSection />

      {/* About Section */}
      <AboutSection />

      {/* Simple Services Section */}
      <ServiceHome />

      {/* Why Us Section */}
      {/* <WhyUsSection /> */}

      {/* Methodology Section */}
      <MethodologySection />

      {/* Portfolio Section */}
      <PortfolioSection limit={3} />

      {/* FAQ Section */}
      <FaqSection />

      {/* Blog Section */}
      <LatestBlogSection />

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
