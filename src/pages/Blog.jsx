import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { useSpinner, useWow } from '../hooks/useAnimations'
import { useLanguage } from '../context/LanguageContext'
import { api, getImageUrl } from '../utils/api'

const Blog = () => {
  const loading = useSpinner()
  useWow()
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [articles, setArticles] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticles = async () => {
      try {
        const data = await api.get('/articles');
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (dataLoading) return null;

  const categories = [...new Set(articles.map(p => isAr ? p.category_ar || 'عام' : p.category_en || 'General'))]

  return (
    <div className="container-fluid p-0" style={{ background: '#F7FAFF' }}>
      <Spinner loading={loading} />
      <Navbar />

      {/* Hero Section */}
      <div className="blog-hero-ellipse position-relative overflow-hidden" style={{ height: '85vh', minHeight: '600px' }}>
        <div className="hero-bg-image position-absolute w-100 h-100" style={{
          backgroundImage: 'url(/img/services/blog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        {/* Elliptical Decorations */}
        <div className="ellipse-deco ellipse-1"></div>
        <div className="ellipse-deco ellipse-2"></div>
        <div className="ellipse-deco ellipse-3"></div>

        <div className="container position-relative h-100 d-flex align-items-center" style={{ zIndex: 2 }}>
          <div className="row align-items-center w-100">
            <div className="col-lg-8">
              <div className="hero-text-ellipse scroll-reveal from-bottom">
                <div className="ellipse-badge d-inline-flex align-items-center gap-2 mb-4 px-4 py-2 rounded-pill bg-white bg-opacity-20 backdrop-blur">
                  <span className="ellipse-dot"></span>
                  <span className="text-white fw-semibold" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                    {isAr ? 'المدونة' : 'THE BLOG'}
                  </span>
                </div>
                <h1 className="display-1 fw-bold text-white mb-4" style={{ lineHeight: '1.1' }}>
                  {isAr ? 'اقرأ. تعلم.' : 'Read. Learn.'}
                  <br />
                  <span className="ellipse-highlight">{isAr ? 'ابدأ الآن' : 'Get Started'}</span>
                </h1>
                <p className="lead text-white mb-0" style={{ maxWidth: '550px', lineHeight: '1.9', opacity: 0.9 }}>
                  {isAr
                    ? 'اكتشف أحدث المقالات والنصائح حول التقنية والذكاء الاصطناعي وتأثيرها على عملك'
                    : 'Discover the latest articles and tips on technology and AI and its impact on your business'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="blog-content-v2 py-5">
        <div className="container-xxl py-5">
          <div className="container px-lg-5">
            <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
              <h6 className="position-relative d-inline text-primary ps-4">
                {isAr ? 'مدونة برق تك' : 'Barq Tech Blog'}
              </h6>
              <h2 className="mt-2">
                {isAr ? 'مقالات ملهمة لمستقبل رقمي واعد' : 'Inspiring Articles for a Promising Digital Future'}
              </h2>
            </div>

            <div className="row g-4">
              {articles.map((post, index) => (
                <div className="col-lg-4 col-md-6" key={post.id}>
                  <div className="blog-card-v2 h-100 scroll-reveal from-bottom" style={{ transitionDelay: `${index * 0.1}s` }}>
                    <div className="card-image-wrap overflow-hidden position-relative">
                      <img
                        src={getImageUrl(post.image)}
                        alt={isAr ? post.title_ar : post.title_en}
                        className="img-fluid w-100 h-100 blog-img"
                      />
                      <div className="card-category-v2">
                        {isAr ? post.category : post.category_en || post.category}
                      </div>
                      <div className="card-overlay-v2">
                        <Link to={`/blog/${post.slug || post.id}`} className="btn btn-light rounded-pill px-4">
                          {isAr ? 'اقرأ الآن' : 'Read Now'}
                        </Link>
                      </div>
                    </div>
                    <div className="card-body-v2 p-4">
                      <div className="d-flex align-items-center mb-3 text-muted small">
                        <i className="fa fa-calendar me-2 ms-2"></i>
                        {new Date(post.published_at || post.created_at).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}
                        <span className="mx-2">|</span>
                        <i className="fa fa-user me-2 ms-2"></i>
                        {isAr ? 'فريق برق' : 'Barq Team'}
                      </div>
                      <h4 className="card-title-v2 mb-3">
                        <Link to={`/blog/${post.slug || post.id}`} className="text-dark text-decoration-none">
                          {isAr ? post.title_ar : post.title_en}
                        </Link>
                      </h4>
                      <p className="card-text-v2 text-muted mb-4">
                        {isAr ? post.excerpt_ar : post.excerpt_en}
                      </p>
                      <Link to={`/blog/${post.slug || post.id}`} className="read-more-v2">
                        {isAr ? 'أكمل القراءة' : 'Continue Reading'}
                        <i className={`fa fa-chevron-${isAr ? 'left' : 'right'} ms-2`}></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  )
}

export default Blog