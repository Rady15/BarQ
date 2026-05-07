import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';

const blogPosts = [
  {
    id: 1,
    titleAr: 'كيف يحول الذكاء الاصطناعي طريقة عملك؟',
    titleEn: 'How AI is Transforming Your Business',
    excerptAr: 'اكتشف كيف يمكن لوكلاء الذكاء الاصطناعي أن يحدثا ثورة في عمليات شركتك ويوفرا الوقت والموارد.',
    excerptEn: 'Discover how AI agents can revolutionize your business operations.',
    image: 'fa-brain',
    category: 'AI',
    categoryAr: 'الذكاء الاصطناعي',
    date: '2026-05-01',
    readTime: '5'
  },
  {
    id: 2,
    titleAr: 'أتمتة العمليات: الطريق نحو الكفاءة',
    titleEn: 'Process Automation: The Path to Efficiency',
    excerptAr: 'تعلم كيف يمكنك أتمتة عملياتك التجارية لتقليل التكاليف.',
    excerptEn: 'Learn how you can automate your business processes.',
    image: 'fa-cogs',
    category: 'Automation',
    categoryAr: 'الأتمتة',
    date: '2026-04-25',
    readTime: '7'
  },
  {
    id: 3,
    titleAr: 'تطوير تطبيقات الويب: اتجاهات 2026',
    titleEn: 'Web Application Development: 2026 Trends',
    excerptAr: 'استكشف أحدث اتجاهات تطوير تطبيقات الويب.',
    excerptEn: 'Explore the latest web application development trends.',
    image: 'fa-laptop-code',
    category: 'Web',
    categoryAr: 'تطوير الويب',
    date: '2026-04-20',
    readTime: '6'
  },
  {
    id: 4,
    titleAr: 'لماذا تحتاج شركتك إلى موقع ويب احترافي؟',
    titleEn: 'Why Your Business Needs a Professional Website',
    excerptAr: 'الموقع الإلكتروني هو واجهة عملك على الإنترنت.',
    excerptEn: 'Your website is your business face on the internet.',
    image: 'fa-globe-americas',
    category: 'Web',
    categoryAr: 'تطوير الويب',
    date: '2026-04-15',
    readTime: '4'
  }
];

export const useBlogPosts = () => blogPosts;

const Blog = () => {
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid p-0">
      <Spinner loading={loading} />
      <Navbar />
      
      <div style={{
        backgroundImage: 'url(/img/services/blog.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '60vh'
      }}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', minHeight: '60vh', paddingTop: '100px' }}>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-8">
                <h1 className="display-2 fw-bold text-white mb-3" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
                  {isAr ? 'المدونة' : 'Blog'}
                </h1>
                <p className="lead text-white" style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.8)' }}>
                  {isAr ? 'آخر المقالات والنصائح' : 'Latest Articles & Tips'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5" style={{ backgroundColor: '#F7FAFF' }}>
        <div className="container px-lg-5">
          <div className="row g-4">
            {blogPosts.map((post) => (
              <div className="col-md-6" key={post.id}>
                <Link to={`/blog/${post.id}`} className="text-decoration-none">
                  <div className="blog-card-modern bg-white rounded-4 overflow-hidden h-100 shadow-sm">
                    <div className="card-image-modern position-relative" style={{ height: '180px', background: 'linear-gradient(135deg, #2124B1 0%, #4777F5 100%)' }}>
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <i className={`fa ${post.image} fa-3x text-white`}></i>
                      </div>
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-white text-primary px-3 py-1 rounded-pill fw-bold">
                          {isAr ? post.categoryAr : post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="d-flex align-items-center gap-3 mb-3 text-muted small">
                        <span><i className="fa fa-calendar me-1"></i> {post.date}</span>
                        <span><i className="fa fa-clock-o me-1"></i> {post.readTime} {isAr ? 'دقيقة' : 'min'}</span>
                      </div>
                      <h3 className="text-dark mb-3" style={{ fontSize: '1.15rem', fontWeight: '600' }}>
                        {isAr ? post.titleAr : post.titleEn}
                      </h3>
                      <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                        {isAr ? post.excerptAr : post.excerptEn}
                      </p>
                      <span className="text-primary fw-bold">
                        {isAr ? 'اقرأ المزيد' : 'Read More'}
                        <i className={`fa fa-arrow-${isAr ? 'left' : 'right'} ms-2`}></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Blog;