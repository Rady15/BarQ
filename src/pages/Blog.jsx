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
    image: 'fa-brain',
    category: 'AI',
    categoryAr: 'الذكاء الاصطناعي',
    date: '2026-05-01',
    readTime: '5',
    color: '#667eea',
    accent: '#764ba2'
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
    color: '#f5576c',
    accent: '#f093fb'
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
    color: '#00f2fe',
    accent: '#4facfe'
  },
  {
    id: 4,
    titleAr: 'لماذا تحتاج شركتك إلى موقع ويب احترافي؟',
    titleEn: 'Why Your Business Needs a Professional Website',
    excerptAr: 'الموقع الإلكتروني هو واجهة عملك على الإنترنت وأداة أساسية للتواصل مع عملائك.',
    excerptEn: 'Your website is your business face on the internet and an essential tool for communicating with your customers.',
    image: 'fa-globe-americas',
    category: 'Web',
    categoryAr: 'تطوير الويب',
    date: '2026-04-15',
    readTime: '4',
    color: '#38f9d7',
    accent: '#43e97b'
  },
  {
    id: 5,
    titleAr: 'حلول الذكاء الاصطناعي للمؤسسات',
    titleEn: 'Enterprise AI Solutions',
    excerptAr: 'استراتيجيات متقدمة لتطبيق الذكاء الاصطناعي في المؤسسات الكبيرة.',
    excerptEn: 'Advanced strategies for implementing AI in large enterprises.',
    image: 'fa-building',
    category: 'AI',
    categoryAr: 'الذكاء الاصطناعي',
    date: '2026-04-10',
    readTime: '8',
    color: '#a8edea',
    accent: '#fed6e3'
  },
  {
    id: 6,
    titleAr: 'أفضل ممارسات التسويق الرقمي',
    titleEn: 'Digital Marketing Best Practices',
    excerptAr: 'استراتيجيات التسويق الرقمي التي ستقود عملك للنجاح في 2026.',
    excerptEn: 'Digital marketing strategies that will drive your business success in 2026.',
    image: 'fa-bullhorn',
    category: 'Marketing',
    categoryAr: 'التسويق',
    date: '2026-04-05',
    readTime: '6',
    color: '#ff9a9e',
    accent: '#fecfef'
  }
];

export const useBlogPosts = () => blogPosts;

const Blog = () => {
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [...new Set(blogPosts.map(p => isAr ? p.categoryAr : p.category))];
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(p => (isAr ? p.categoryAr : p.category) === activeCategory);

  return (
    <div className="container-fluid p-0" style={{ background: '#0a0a0a' }}>
      <Spinner loading={loading} />
      <Navbar />

      <div className="blog-hero-v2 position-relative overflow-hidden">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        <div className="hero-grid-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid-line" style={{ left: `${(i + 1) * 20}%` }}></div>
          ))}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid-line horizontal" style={{ top: `${(i + 1) * 20}%` }}></div>
          ))}
        </div>
        
        <div className="container-xxl py-5 position-relative">
          <div className="container px-lg-5 py-5">
            <div className="row min-vh-70 align-items-center">
              <div className="col-lg-8">
                <div className="hero-content-v2 scroll-reveal from-bottom">
                  <div className="hero-badge d-inline-flex align-items-center gap-2 mb-4">
                    <span className="badge-dot"></span>
                    <span className="text-white" style={{ opacity: 0.8, fontSize: '0.9rem', letterSpacing: '2px' }}>
                      {isAr ? 'المدونة' : 'THE BLOG'}
                    </span>
                  </div>
                  <h1 className="display-1 fw-bold text-white mb-4" style={{ 
                    lineHeight: '1.1',
                    background: 'linear-gradient(135deg, #fff 0%, #667eea 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {isAr ? 'المعرفة قوة' : 'KNOWLEDGE'}
                  </h1>
                  <h1 className="display-1 fw-bold text-white mb-4" style={{ lineHeight: '1.1' }}>
                    {isAr ? 'في عصر الذكاء' : 'IS POWER'}
                  </h1>
                  <p className="lead text-white mb-0" style={{ 
                    fontSize: '1.2rem', 
                    maxWidth: '550px',
                    opacity: 0.7,
                    lineHeight: '1.8'
                  }}>
                    {isAr 
                      ? 'استكشف أحدث الرؤى حول التقنية والابتكار الذي يحدد مستقبل الأعمال'
                      : 'Explore the latest insights on technology and innovation that shape business future'}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 d-none d-lg-block">
                <div className="hero-stats scroll-reveal from-right">
                  <div className="stat-card">
                    <span className="stat-number">{blogPosts.length}</span>
                    <span className="stat-label">{isAr ? 'مقال' : 'Articles'}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">{categories.length}</span>
                    <span className="stat-label">{isAr ? 'تصنيف' : 'Categories'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </div>

      <div className="blog-content-v2 py-5" style={{ background: '#0a0a0a' }}>
        <div className="container-xxl py-5">
          <div className="container px-lg-5">
            <div className="category-filter mb-5 scroll-reveal from-bottom">
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <button 
                  className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  {isAr ? 'الكل' : 'All'}
                </button>
                {categories.map((cat, i) => (
                  <button 
                    key={i}
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-4">
              {filteredPosts.map((post, index) => (
                <div className="col-lg-4 col-md-6" key={post.id}>
                  <Link to={`/blog/${post.id}`} className="text-decoration-none">
                    <div className="blog-card-v2 h-100" style={{ '--accent': post.color }}>
                      <div className="card-glow" style={{ background: post.color }}></div>
                      <div className="card-content">
                        <div className="card-header-v2">
                          <div className="card-icon-wrap" style={{ background: post.color }}>
                            <i className={`fa ${post.image} text-white`}></i>
                          </div>
                          <span className="card-category-badge" style={{ color: post.color }}>
                            {isAr ? post.categoryAr : post.category}
                          </span>
                        </div>
                        <h3 className="card-title-v2 text-white mb-3">
                          {isAr ? post.titleAr : post.titleEn}
                        </h3>
                        <p className="card-excerpt-v2 mb-4" style={{ opacity: 0.7 }}>
                          {isAr ? post.excerptAr : post.excerptEn}
                        </p>
                        <div className="card-meta-v2 d-flex align-items-center justify-content-between">
                          <span className="text-white" style={{ opacity: 0.5, fontSize: '0.85rem' }}>
                            <i className="fa fa-calendar me-2"></i>
                            {post.date}
                          </span>
                          <span className="text-white" style={{ opacity: 0.5, fontSize: '0.85rem' }}>
                            <i className="fa fa-clock-o me-2"></i>
                            {post.readTime} {isAr ? 'دقيقة' : 'min'}
                          </span>
                        </div>
                      </div>
                      <div className="card-arrow-v2">
                        <i className={`fa fa-arrow-${isAr ? 'left' : 'right'}`} style={{ color: post.color }}></i>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-5">
                <i className="fa fa-folder-open fa-4x text-white" style={{ opacity: 0.3 }}></i>
                <p className="text-white mt-4" style={{ opacity: 0.5 }}>
                  {isAr ? 'لا توجد مقالات في هذا التصنيف' : 'No articles in this category'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Blog;