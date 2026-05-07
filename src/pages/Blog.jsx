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
    readTime: '5'
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
    readTime: '7'
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
    readTime: '6'
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
    readTime: '4'
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
    readTime: '8'
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
    readTime: '6'
  }
];

export const useBlogPosts = () => blogPosts;

const Blog = () => {
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [...new Set(blogPosts.map(p => isAr ? p.categoryAr : p.category))];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || (isAr ? post.categoryAr : post.category) === activeCategory;
    const matchesSearch = (isAr ? post.titleAr : post.titleEn).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container-fluid bg-light p-0">
      <Spinner loading={loading} />
      <Navbar />

      <div className="blog-hero-modern position-relative overflow-hidden" style={{ 
        backgroundImage: 'url(/img/services/blog.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%'
      }}>
        <div className="container-xxl py-5 position-relative">
          <div className="container px-lg-5 py-5">
            <div className="row min-vh-50 align-items-center">
              <div className="col-lg-8">
                <div className="hero-badge-modern d-inline-flex align-items-center gap-2 mb-4 px-4 py-2 bg-white rounded-pill shadow-sm">
                  <span className="badge-dot-modern"></span>
                  <span className="fw-bold" style={{ fontSize: '0.85rem', letterSpacing: '1px', color: '#2124B1' }}>
                    {isAr ? 'المدونة' : 'THE BLOG'}
                  </span>
                </div>
                <h1 className="display-2 fw-bold text-white mb-3" style={{ lineHeight: '1.15', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                  {isAr ? 'مدونة' : 'Our'}
                  <span className="d-block" style={{ color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                    {isAr ? 'برق تك' : 'Blog'}
                  </span>
                </h1>
                <p className="lead mb-0 text-white" style={{ fontSize: '1.15rem', maxWidth: '520px', lineHeight: '1.8', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                  {isAr 
                    ? 'استكشف أحدث الرؤى والنصائح حول التقنية والذكاء الاصطناعي وتأثيرها على عملك'
                    : 'Explore the latest insights on technology, AI and business innovation'}
                </p>
              </div>
              <div className="col-lg-4 d-none d-lg-block">
                <div className="hero-image-modern text-center">
                  <div className="image-stack">
                    <div className="stack-card stack-1">
                      <i className="fa fa-robot fa-2x text-white"></i>
                    </div>
                    <div className="stack-card stack-2">
                      <i className="fa fa-cogs fa-2x text-white"></i>
                    </div>
                    <div className="stack-card stack-3">
                      <i className="fa fa-laptop-code fa-2x text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-main-modern py-5" style={{ background: '#F7FAFF' }}>
          <div className="container-xxl py-4">
            <div className="container px-lg-5">
              <div className="row g-5">
                <div className="col-lg-8">
                  <div className="filter-bar-modern d-flex flex-wrap gap-3 mb-5 align-items-center">
                    <select 
                      className="form-select rounded-pill border-0 shadow-sm"
                      style={{ width: 'auto', minWidth: '150px' }}
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                    >
                      <option value="all">{isAr ? 'الكل' : 'All'}</option>
                      {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="search-input-modern flex-grow-1 position-relative" style={{ maxWidth: '300px' }}>
                      <i className="fa fa-search position-absolute text-muted" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)' }}></i>
                      <input
                        type="text"
                        className="form-control rounded-pill border-0 shadow-sm"
                        placeholder={isAr ? 'بحث...' : 'Search...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '40px' }}
                      />
                    </div>
                  </div>

                  <div className="row g-4">
                    {filteredPosts.map((post, index) => (
                      <div className="col-md-6" key={post.id}>
                        <Link to={`/blog/${post.id}`} className="text-decoration-none">
                          <div className="blog-card-modern bg-white rounded-4 overflow-hidden h-100 shadow-sm">
                            <div className="card-image-modern position-relative" style={{ height: '180px', background: 'linear-gradient(135deg, #2124B1 0%, #4777F5 100%)' }}>
                              <div className="card-icon-center d-flex align-items-center justify-content-center h-100">
                                <i className={`fa ${post.image} fa-3x text-white`}></i>
                              </div>
                              <div className="card-badge-modern position-absolute top-0 end-0 m-3">
                                <span className="badge bg-white text-primary px-3 py-1 rounded-pill fw-bold" style={{ fontSize: '0.75rem' }}>
                                  {isAr ? post.categoryAr : post.category}
                                </span>
                              </div>
                            </div>
                            <div className="card-body-modern p-4">
                              <div className="card-meta-modern d-flex align-items-center gap-3 mb-3 text-muted" style={{ fontSize: '0.85rem' }}>
                                <span><i className="fa fa-calendar me-1"></i> {post.date}</span>
                                <span><i className="fa fa-clock-o me-1"></i> {post.readTime} {isAr ? 'دقيقة' : 'min'}</span>
                              </div>
                              <h3 className="card-title-modern text-dark mb-3" style={{ fontSize: '1.15rem', lineHeight: '1.5', fontWeight: '600' }}>
                                {isAr ? post.titleAr : post.titleEn}
                              </h3>
                              <p className="card-excerpt-modern text-muted mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
                                {isAr ? post.excerptAr : post.excerptEn}
                              </p>
                              <div className="card-link-modern text-primary fw-bold" style={{ fontSize: '0.9rem' }}>
                                {isAr ? 'اقرأ المزيد' : 'Read More'}
                                <i className={`fa fa-arrow-${isAr ? 'left' : 'right'} ms-2`}></i>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {filteredPosts.length === 0 && (
                    <div className="text-center py-5 bg-white rounded-4">
                      <i className="fa fa-search fa-4x text-muted opacity-25"></i>
                      <p className="text-muted mt-3">{isAr ? 'لا توجد نتائج' : 'No results found'}</p>
                    </div>
                  )}
                </div>

                <div className="col-lg-4">
                  <div className="sidebar-modern">
                    <div className="sidebar-card-modern bg-white rounded-4 p-4 mb-4 shadow-sm">
                      <h5 className="sidebar-title-modern text-dark fw-bold mb-4">
                        <i className="fa fa-folder-open text-primary me-2"></i>
                        {isAr ? 'التصنيفات' : 'Categories'}
                      </h5>
                      <div className="category-list-modern">
                        {categories.map((cat, i) => {
                          const count = blogPosts.filter(p => (isAr ? p.categoryAr : p.category) === cat).length;
                          return (
                            <Link 
                              to="#" 
                              key={i} 
                              className={`category-link-modern d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none ${activeCategory === cat ? 'active' : ''}`}
                              onClick={() => setActiveCategory(cat)}
                            >
                              <span className="text-dark">{cat}</span>
                              <span className="badge bg-primary rounded-pill">{count}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <div className="sidebar-card-modern bg-white rounded-4 p-4 mb-4 shadow-sm">
                      <h5 className="sidebar-title-modern text-dark fw-bold mb-4">
                        <i className="fa fa-paper-plane text-primary me-2"></i>
                        {isAr ? 'آخر المقالات' : 'Recent Posts'}
                      </h5>
                      <div className="recent-posts-modern">
                        {blogPosts.slice(0, 4).map((post, i) => (
                          <Link to={`/blog/${post.id}`} key={post.id} className="recent-post-item d-flex align-items-center gap-3 text-decoration-none mb-3">
                            <div className="recent-post-icon bg-primary rounded-3 d-flex align-items-center justify-content-center text-white" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                              <i className={`fa ${post.image}`}></i>
                            </div>
                            <div className="recent-post-info flex-grow-1">
                              <h6 className="text-dark mb-1" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                                {isAr ? post.titleAr : post.titleEn}
                              </h6>
                              <small className="text-muted">{post.date}</small>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="sidebar-card-modern bg-gradient-modern rounded-4 p-4 shadow-sm">
                      <div className="text-center">
                        <i className="fa fa-envelope-open fa-3x text-white mb-3"></i>
                        <h5 className="text-white mb-2">{isAr ? 'النشرة البريدية' : 'Newsletter'}</h5>
                        <p className="text-white mb-3" style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                          {isAr ? 'شاركنا للحصول على جديد المقالات' : 'Subscribe to get latest articles'}
                        </p>
                        <input 
                          type="email" 
                          className="form-control border-0 rounded-pill mb-3" 
                          placeholder={isAr ? 'بريدك الإلكتروني' : 'Your email'}
                        />
                        <button className="btn btn-white w-100 rounded-pill fw-bold text-primary">
                          {isAr ? 'اشتراك' : 'Subscribe'}
                        </button>
                      </div>
                    </div>
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