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
    excerptEn: 'Discover how AI agents can revolutionize your business operations and save time and resources.',
    image: 'fa-robot',
    category: 'AI',
    categoryAr: 'الذكاء الاصطناعي',
    date: '2026-05-01',
    readTime: '5',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    titleAr: 'أتمتة العمليات: الطريق نحو الكفاءة',
    titleEn: 'Process Automation: The Path to Efficiency',
    excerptAr: 'تعلم كيف يمكنك أتمتة عملياتك التجارية لتقليل التكاليف وتحسين الإنتاجية.',
    excerptEn: 'Learn how you can automate your business processes to reduce costs and improve productivity.',
    image: 'fa-cogs',
    category: 'Automation',
    categoryAr: 'الأتمتة',
    date: '2026-04-25',
    readTime: '7',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    titleAr: 'تطوير تطبيقات الويب: اتجاهات 2026',
    titleEn: 'Web Application Development: 2026 Trends',
    excerptAr: 'استكشف أحدث اتجاهات تطوير تطبيقات الويب التي ستشكل المستقبل الرقمي.',
    excerptEn: 'Explore the latest web application development trends that will shape the digital future.',
    image: 'fa-laptop-code',
    category: 'Web',
    categoryAr: 'تطوير الويب',
    date: '2026-04-20',
    readTime: '6',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 4,
    titleAr: 'لماذا تحتاج شركتك إلى موقع ويب احترافي؟',
    titleEn: 'Why Your Business Needs a Professional Website',
    excerptAr: 'الموقع الإلكتروني هو واجهة عملك على الإنترنت وأداة أساسية للتواصل مع عملائك.',
    excerptEn: 'Your website is your business face on the internet and an essential tool for communicating with your customers.',
    image: 'fa-globe',
    category: 'Web',
    categoryAr: 'تطوير الويب',
    date: '2026-04-15',
    readTime: '4',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
];

export const useBlogPosts = () => blogPosts;

const Blog = () => {
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [featuredPost, setFeaturedPost] = useState(blogPosts[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [...new Set(blogPosts.map(p => isAr ? p.categoryAr : p.category))];

  return (
    <div className="container-fluid bg-light p-0">
      <Spinner loading={loading} />
      <Navbar />

      <div className="blog-hero-section position-relative overflow-hidden">
        <div className="hero-shapes position-absolute w-100 h-100">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container-xxl py-5 position-relative">
          <div className="container px-lg-5 py-5">
            <div className="row align-items-center min-vh-60">
              <div className="col-lg-8">
                <div className="hero-content scroll-reveal from-bottom">
                  <span className="badge bg-white text-primary px-4 py-2 rounded-pill mb-4 shadow">
                    <i className="fa fa-pencil-alt me-2"></i>
                    {isAr ? 'المدونة' : 'Blog'}
                  </span>
                  <h1 className="display-2 fw-bold text-dark mb-4" style={{ lineHeight: '1.2' }}>
                    {isAr ? 'آخر المقالات والنصائح' : 'Latest Articles & Tips'}
                  </h1>
                  <p className="lead text-muted mb-0" style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
                    {isAr 
                      ? 'استكشف أحدث المقالات والنصائح حول التقنية والذكاء الاصطناعي وتأثيرها على عملك'
                      : 'Explore the latest articles and tips about technology and AI and its impact on your business'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F7FAFF"/>
          </svg>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container px-lg-5">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="section-title position-relative text-center mb-5 scroll-reveal from-bottom">
                <h6 className="position-relative d-inline text-primary ps-4">
                  {isAr ? 'مقالات مميزة' : 'Featured Articles'}
                </h6>
                <h2 className="mt-2" style={{ color: 'var(--primary)' }}>
                  {isAr ? 'اقرأ وأكتشف' : 'Read & Discover'}
                </h2>
              </div>

              <div className="row g-4">
                {blogPosts.map((post, index) => (
                  <div className="col-md-6 scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }} key={post.id}>
                    <Link to={`/blog/${post.id}`} className="text-decoration-none">
                      <div className="blog-card-modern bg-white rounded-4 overflow-hidden h-100">
                        <div className="card-image-wrapper position-relative" style={{ height: '200px', background: post.color }}>
                          <div className="card-icon-layer d-flex align-items-center justify-content-center h-100">
                            <i className={`fa ${post.image} fa-5x text-white opacity-80`}></i>
                          </div>
                          <div className="card-overlay position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.1)' }}></div>
                          <div className="card-category position-absolute top-0 end-0 m-3">
                            <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold">
                              {isAr ? post.categoryAr : post.category}
                            </span>
                          </div>
                          <div className="card-date position-absolute bottom-0 start-0 w-100 p-3">
                            <div className="d-flex align-items-center text-white gap-3">
                              <span><i className="fa fa-calendar me-2"></i>{post.date}</span>
                              <span><i className="fa fa-clock-o me-2"></i>{post.readTime} {isAr ? 'دقيقة' : 'min'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="card-body-custom p-4">
                          <h4 className="mb-3 text-dark card-title" style={{ fontSize: '1.25rem', lineHeight: '1.4' }}>
                            {isAr ? post.titleAr : post.titleEn}
                          </h4>
                          <p className="text-muted mb-3 card-excerpt" style={{ lineHeight: '1.7' }}>
                            {isAr ? post.excerptAr : post.excerptEn}
                          </p>
                          <div className="card-arrow">
                            <i className={`fa fa-arrow-${isAr ? 'left' : 'right'} text-primary`}></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="blog-sidebar-modern">
                <div className="search-box-modern bg-white rounded-4 p-4 mb-4 scroll-reveal from-right">
                  <h5 className="mb-4 text-dark fw-bold">
                    <i className={`fa fa-search text-primary me-2`}></i>
                    {isAr ? 'بحث سريع' : 'Quick Search'}
                  </h5>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control border-0 bg-light rounded-pill py-3 px-4"
                      placeholder={isAr ? 'ابحث في المقالات...' : 'Search...'}
                      style={{ paddingRight: '50px' }}
                    />
                    <button className="btn btn-primary position-absolute end-0 top-0 h-100 rounded-pill px-4">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>

                <div className="categories-box-modern bg-white rounded-4 p-4 mb-4 scroll-reveal from-right">
                  <h5 className="mb-4 text-dark fw-bold">
                    <i className={`fa fa-folder-open text-primary me-2`}></i>
                    {isAr ? 'التصنيفات' : 'Categories'}
                  </h5>
                  <div className="d-flex flex-column gap-2">
                    {categories.map((cat, i) => (
                      <Link to="#" key={i} className="category-item d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none">
                        <span className="text-dark">{cat}</span>
                        <span className="badge bg-primary rounded-pill">{blogPosts.filter(p => (isAr ? p.categoryAr : p.category) === cat).length}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="newsletter-box-modern bg-gradient rounded-4 p-4 mb-4 scroll-reveal from-right">
                  <div className="text-center">
                    <i className="fa fa-envelope-open fa-3x text-white mb-3"></i>
                    <h5 className="text-white mb-3">{isAr ? 'النشرة البريدية' : 'Newsletter'}</h5>
                    <p className="text-white mb-4" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                      {isAr ? 'اشترك للحصول على آخر المقالات' : 'Subscribe for latest articles'}
                    </p>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control border-0 rounded-pill py-3"
                        placeholder={isAr ? 'بريدك الإلكتروني' : 'Your email'}
                      />
                    </div>
                    <button className="btn btn-white w-100 rounded-pill mt-3 fw-bold">
                      {isAr ? 'اشتراك' : 'Subscribe'}
                    </button>
                  </div>
                </div>

                <div className="tags-box-modern bg-white rounded-4 p-4 scroll-reveal from-right">
                  <h5 className="mb-4 text-dark fw-bold">
                    <i className={`fa fa-tags text-primary me-2`}></i>
                    {isAr ? 'الوسوم' : 'Tags'}
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {['AI', 'Web', 'Automation', 'Marketing', 'Tech'].map((tag, i) => (
                      <Link to="#" key={i} className="tag-badge bg-light text-dark px-3 py-2 rounded-pill text-decoration-none">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Blog;