import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { useSpinner, useWow } from '../hooks/useAnimations'
import { useLanguage } from '../context/LanguageContext'

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
    gradient: 'linear-gradient(135deg, #2124B1 0%, #4777F5 100%)'
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
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
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
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
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
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
]

export const useBlogPosts = () => blogPosts

const Blog = () => {
  const loading = useSpinner()
  useWow()
  const { lang } = useLanguage()
  const isAr = lang === 'ar'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categories = [...new Set(blogPosts.map(p => isAr ? p.categoryAr : p.category))]

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
        <div className="hero-gradient-overlay position-absolute w-100 h-100" style={{
          background: 'linear-gradient(180deg, rgba(33,36,177,0.85) 0%, rgba(71,119,245,0.7) 50%, rgba(33,36,177,0.9) 100%)'
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

      {/* Ellipse Divider */}
      <div className="ellipse-divider">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="720" cy="60" rx="500" ry="50" fill="#2124B1" opacity="0.1" />
          <path d="M0 40C360 80 720 80 1080 60C1260 50 1440 60 1440 60V120H0Z" fill="#F7FAFF" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="blog-content-ellipse py-5" style={{ background: '#F7FAFF' }}>
        <div className="container-xxl py-4">
          <div className="container px-lg-5">
            <div className="section-title-ellipse text-center mb-5 scroll-reveal from-bottom">
              <h2 className="fw-bold text-dark mb-2" style={{ fontSize: '2.5rem' }}>
                {isAr ? 'آخر المقالات' : 'Latest Articles'}
              </h2>
              <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto' }}>
                {isAr ? 'تصفح أحدث المقالات التي كتبناها لك' : 'Browse the latest articles we wrote for you'}
              </p>
            </div>

            <div className="row g-4">
              {blogPosts.map((post, index) => (
                <div className="col-lg-6" key={post.id}>
                  <Link to={`/blog/${post.id}`} className="text-decoration-none">
                    <div className="blog-card-ellipse h-100 scroll-reveal from-bottom" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="card-ellipse-image position-relative overflow-hidden" style={{ background: post.gradient }}>
                        <div className="ellipse-icon-wrap d-flex align-items-center justify-content-center">
                          <i className={`fa ${post.image} fa-3x text-white`}></i>
                        </div>
                        <div className="ellipse-category position-absolute top-0 end-0 m-3">
                          <span className="pill-badge px-3 py-1 rounded-pill bg-white text-primary fw-bold small">
                            {isAr ? post.categoryAr : post.category}
                          </span>
                        </div>
                      </div>
                      <div className="card-ellipse-body p-4">
                        <div className="card-meta d-flex align-items-center gap-3 mb-3" style={{ fontSize: '0.85rem' }}>
                          <span className="text-muted">
                            <i className="fa fa-calendar me-1"></i> {post.date}
                          </span>
                          <span className="text-muted">
                            <i className="fa fa-clock-o me-1"></i> {post.readTime} {isAr ? 'دقيقة' : 'min'}
                          </span>
                        </div>
                        <h3 className="card-title text-dark mb-3 fw-semibold" style={{ fontSize: '1.25rem', lineHeight: '1.5' }}>
                          {isAr ? post.titleAr : post.titleEn}
                        </h3>
                        <p className="card-excerpt text-muted mb-0 small" style={{ lineHeight: '1.7' }}>
                          {isAr ? post.excerptAr : post.excerptEn}
                        </p>
                        <div className="card-action mt-3 text-primary fw-semibold small">
                          {isAr ? 'اقرأ المزيد' : 'Read More'}
                          <i className={`fa fa-arrow-${isAr ? 'left' : 'right'} ms-2`}></i>
                        </div>
                      </div>
                    </div>
                  </Link>
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