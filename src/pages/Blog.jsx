import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';
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
    image: 'fa-globe',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = (isAr ? post.titleAr : post.titleEn).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || (isAr ? post.categoryAr : post.category) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(blogPosts.map(p => isAr ? p.categoryAr : p.category))];

  return (
    <div className="container-fluid bg-white p-0">
      <Spinner loading={loading} />
      <div className="container-fluid position-relative p-0">
        <Navbar />
        <PageHeader
          title={isAr ? 'المدونة' : 'Blog'}
          breadcrumb={isAr ? 'المقالات والنصائح' : 'Articles & Tips'}
          bgImage="/img/hero.png"
        />
      </div>

      <div className="container-xxl py-5">
        <div className="container px-lg-5">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="row g-4 mb-5">
                {filteredPosts.map((post, index) => (
                  <div className={`col-12 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} key={post.id}>
                    <div className="blog-card bg-white rounded shadow-sm overflow-hidden h-100">
                      <div className="blog-image-wrapper position-relative">
                        <div className="blog-image bg-light d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                          <i className={`fa ${post.image} fa-4x text-primary opacity-25`}></i>
                        </div>
                        <div className="blog-category-badge position-absolute top-0 start-0 m-3">
                          <span className="badge bg-primary px-3 py-2 rounded-pill">
                            {isAr ? post.categoryAr : post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="d-flex align-items-center mb-3 text-muted small">
                          <i className={`fa fa-calendar ${isAr ? 'ms-2' : 'me-2'}`}></i>
                          <span>{post.date}</span>
                          <span className={`mx-2 ${isAr ? 'border-end border-secondary' : 'border-start border-secondary'}`} style={{ height: '14px' }}></span>
                          <i className={`fa fa-clock-o ${isAr ? 'mx-1' : 'mx-1'}`}></i>
                          <span>{post.readTime} {isAr ? 'دقيقة' : 'min'}</span>
                        </div>
                        <h4 className="mb-3 text-dark" style={{ fontSize: '1.4rem', lineHeight: '1.4' }}>
                          {isAr ? post.titleAr : post.titleEn}
                        </h4>
                        <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
                          {isAr ? post.excerptAr : post.excerptEn}
                        </p>
                        <Link to={`/blog/${post.id}`} className="btn btn-outline-primary px-4 rounded-pill">
                          {isAr ? 'اقرأ المزيد' : 'Read More'}
                          <i className={`fa fa-arrow-${isAr ? 'left' : 'right'} ${isAr ? 'me-2' : 'ms-2'}`}></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-5">
                  <i className="fa fa-search fa-3x text-muted opacity-50 mb-3"></i>
                  <p className="text-muted">{isAr ? 'لا توجد مقالات مطابقة' : 'No matching articles found'}</p>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <div className="blog-sidebar">
                <div className="bg-light rounded p-4 mb-4 scroll-reveal from-right">
                  <h5 className="mb-4 text-primary border-bottom pb-2">
                    <i className={`fa fa-search ${isAr ? 'ms-2' : 'me-2'}`}></i>
                    {isAr ? 'بحث' : 'Search'}
                  </h5>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      placeholder={isAr ? 'ابحث في المقالات...' : 'Search articles...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-light rounded p-4 mb-4 scroll-reveal from-right">
                  <h5 className="mb-4 text-primary border-bottom pb-2">
                    <i className={`fa fa-folder ${isAr ? 'ms-2' : 'me-2'}`}></i>
                    {isAr ? 'التصنيفات' : 'Categories'}
                  </h5>
                  <div className="d-flex flex-wrap gap-2">
                    {categories.map((cat, i) => (
                      <button
                        key={i}
                        className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'} rounded-pill`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat === 'all' ? (isAr ? 'الكل' : 'All') : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-light rounded p-4 mb-4 scroll-reveal from-right">
                  <h5 className="mb-4 text-primary border-bottom pb-2">
                    <i className={`fa fa-paper-plane ${isAr ? 'ms-2' : 'me-2'}`}></i>
                    {isAr ? 'آخر المقالات' : 'Recent Posts'}
                  </h5>
                  <div className="d-flex flex-column gap-3">
                    {blogPosts.slice(0, 3).map((post) => (
                      <Link to={`/blog/${post.id}`} key={post.id} className="d-flex align-items-center text-decoration-none">
                        <div className="blog-mini-thumb bg-primary opacity-25 rounded flex-shrink-0 me-3" style={{ width: '60px', height: '60px' }}>
                          <i className="fa fa-file-text text-white d-flex align-items-center justify-content-center h-100"></i>
                        </div>
                        <div>
                          <h6 className="mb-1 text-dark small" style={{ lineHeight: '1.3' }}>
                            {isAr ? post.titleAr : post.titleEn}
                          </h6>
                          <small className="text-muted">{post.date}</small>
                        </div>
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