import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { useSpinner } from '../hooks/useAnimations'
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

const BlogPost = () => {
  const loading = useSpinner()
  const { id } = useParams()
  const { lang } = useLanguage()
  const isAr = lang === 'ar'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const post = blogPosts.find(p => p.id === parseInt(id))
  const relatedPosts = blogPosts.filter(p => p.id !== parseInt(id)).slice(0, 3)

  if (!post) {
    return (
      <div className="container-fluid p-0" style={{ background: '#F7FAFF' }}>
        <Spinner loading={loading} />
        <Navbar />
        <div className="container py-5 text-center">
          <i className="fa fa-exclamation-circle fa-5x text-muted opacity-25"></i>
          <h2 className="text-dark mt-4">{isAr ? 'المقال غير موجود' : 'Article Not Found'}</h2>
          <Link to="/blog" className="btn btn-primary rounded-pill mt-4">
            {isAr ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>
        </div>
        <Footer />
        <BackToTop />
      </div>
    )
  }

  return (
    <div className="container-fluid p-0" style={{ background: '#F7FAFF' }}>
      <Spinner loading={loading} />
      <Navbar />

      {/* Hero */}
      <div className="post-hero-ellipse position-relative overflow-hidden" style={{ minHeight: '55vh' }}>
        <div className="hero-bg-image position-absolute w-100 h-100" style={{
          backgroundImage: 'url(/img/services/blog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="hero-gradient-overlay position-absolute w-100 h-100" style={{
          background: 'linear-gradient(135deg, rgba(33,36,177,0.92) 0%, rgba(71,119,245,0.88) 100%)'
        }}></div>
        <div className="ellipse-deco ellipse-1"></div>
        <div className="ellipse-deco ellipse-4"></div>

        <div className="container position-relative h-100 d-flex align-items-center" style={{ zIndex: 2, paddingTop: '100px', paddingBottom: '50px' }}>
          <div className="row align-items-center w-100">
            <div className="col-lg-8">
              <Link to="/blog" className="text-white text-decoration-none d-inline-flex align-items-center gap-2 mb-4 fw-semibold opacity-75 hover-opacity-100" style={{ transition: 'opacity 0.3s' }}>
                <i className={`fa fa-arrow-${isAr ? 'right' : 'left'}`}></i>
                {isAr ? 'العودة للمقالات' : 'Back to Articles'}
              </Link>
              <span className="d-inline-block badge bg-white text-primary rounded-pill px-4 py-2 mb-4 fw-semibold">
                {isAr ? post.categoryAr : post.category}
              </span>
              <h1 className="display-3 fw-bold text-white mb-4" style={{ lineHeight: '1.2' }}>
                {isAr ? post.titleAr : post.titleEn}
              </h1>
              <div className="d-flex align-items-center gap-4 text-white opacity-80">
                <span><i className="fa fa-calendar me-2"></i>{post.date}</span>
                <span><i className="fa fa-clock-o me-2"></i>{post.readTime} {isAr ? 'دقيقة قراءة' : 'min read'}</span>
              </div>
            </div>
            <div className="col-lg-4 text-center d-none d-lg-block">
              <div className="ellipse-icon-container d-inline-flex align-items-center justify-content-center" style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.4)'
              }}>
                <i className={`fa ${post.image} fa-4x text-white`}></i>
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

      {/* Content */}
      <div className="post-content-ellipse py-5" style={{ background: '#F7FAFF' }}>
        <div className="container px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="post-body-ellipse bg-white rounded-4 p-4 p-md-5 shadow-sm mb-5">
                <p className="lead text-dark mb-4" style={{ lineHeight: '1.9' }}>
                  {isAr ? post.excerptAr : post.excerptEn}
                </p>

                {isAr ? (
                  <>
                    <h2 className="text-primary fw-bold mb-3 mt-4">مقدمة</h2>
                    <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                      في عالم الأعمال الحديث، أصبح الذكاء الاصطناعي ليس مجرد تقنية مستقبلية، بل ضرورة حالية لكل مؤسسة تسعى للنمو والتميز. إن تبني هذه التقنيات يمكن أن يحدث فرقاً كبيراً في نتائج عملك ويمنحك ميزة تنافسية قوية في السوق المحلي والعالمي.
                    </p>
                    <h2 className="text-primary fw-bold mb-3 mt-5">ما هو الوكيل الذكي؟</h2>
                    <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                      الوكيل الذكي هو نظام برمجي متطور يعمل كموظف رقمي مستقل، قادر على فهم المهام وتنفيذها ذاتياً دون الحاجة لتدخل بشري مستمر.
                    </p>
                    <h2 className="text-primary fw-bold mb-3 mt-5">الفوائد الرئيسية</h2>
                    <div className="ellipse-benefits">
                      {[
                        { title: 'توفير التكاليف', desc: 'تقليل الاعتماد على العمالة البشرية في المهام الروتينية', icon: 'fa-coins' },
                        { title: 'السرعة', desc: 'تنفيذ المهام في ثوانٍ بدلاً من ساعات', icon: 'fa-bolt' },
                        { title: 'الدقة', desc: 'تجنب الأخطاء البشرية بنسبة تصل إلى 99%', icon: 'fa-check-circle' },
                        { title: 'التوفر', desc: 'العمل على مدار الساعة طوال أيام الأسبوع', icon: 'fa-clock' }
                      ].map((item, i) => (
                        <div key={i} className="ellipse-benefit-item d-flex align-items-start p-4 rounded-4 mb-3 bg-light">
                          <div className="ellipse-benefit-icon d-flex align-items-center justify-content-center me-3 me-md-4 rounded-circle text-white" style={{ width: '50px', height: '50px', minWidth: '50px', background: post.gradient, fontSize: '1.2rem' }}>
                            <i className={`fa ${item.icon}`}></i>
                          </div>
                          <div>
                            <h5 className="text-dark mb-2 fw-semibold">{item.title}</h5>
                            <p className="text-muted mb-0 small">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h2 className="text-primary fw-bold mb-3 mt-5">الخاتمة</h2>
                    <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                      الذكاء الاصطناعي هو المستقبل، والشركات التي تتبناه مبكراً ستحصل على ميزة تنافسية كبيرة في السوق.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-primary fw-bold mb-3 mt-4">Introduction</h2>
                    <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                      In today's business world, AI is not just a future technology, but a current necessity for any organization seeking growth.
                    </p>
                    <h2 className="text-primary fw-bold mb-3 mt-5">What is an AI Agent?</h2>
                    <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                      An AI agent is a sophisticated software system that works as an independent digital employee, capable of understanding and executing tasks autonomously.
                    </p>
                    <h2 className="text-primary fw-bold mb-3 mt-5">Key Benefits</h2>
                    <div className="ellipse-benefits">
                      {[
                        { title: 'Cost Savings', desc: 'Reduce reliance on human labor for routine tasks', icon: 'fa-coins' },
                        { title: 'Speed', desc: 'Execute tasks in seconds instead of hours', icon: 'fa-bolt' },
                        { title: 'Accuracy', desc: 'Avoid human errors up to 99%', icon: 'fa-check-circle' },
                        { title: 'Availability', desc: 'Work around the clock without breaks', icon: 'fa-clock' }
                      ].map((item, i) => (
                        <div key={i} className="ellipse-benefit-item d-flex align-items-start p-4 rounded-4 mb-3 bg-light">
                          <div className="ellipse-benefit-icon d-flex align-items-center justify-content-center me-3 me-md-4 rounded-circle text-white" style={{ width: '50px', height: '50px', minWidth: '50px', background: post.gradient, fontSize: '1.2rem' }}>
                            <i className={`fa ${item.icon}`}></i>
                          </div>
                          <div>
                            <h5 className="text-dark mb-2 fw-semibold">{item.title}</h5>
                            <p className="text-muted mb-0 small">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h2 className="text-primary fw-bold mb-3 mt-5">Conclusion</h2>
                    <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                      AI is the future. Companies that adopt it early will gain a significant competitive advantage.
                    </p>
                  </>
                )}

                {/* Share */}
                <div className="post-share-ellipse mt-5 pt-4" style={{ borderTop: '2px solid #f0f0f0' }}>
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-muted">{isAr ? 'مشاركة:' : 'Share:'}</span>
                      <div className="d-flex gap-2">
                        {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((social, i) => (
                          <button key={i} className="btn btn-sm rounded-circle" style={{ width: '40px', height: '40px', background: '#F7FAFF', color: '#2124B1', border: '1px solid #e0e0e0' }}>
                            <i className={`fa fa-${social}`}></i>
                          </button>
                        ))}
                      </div>
                    </div>
                    <Link to="/blog" className="btn rounded-pill px-4 text-white" style={{ background: post.gradient }}>
                      <i className="fa fa-list me-2"></i>
                      {isAr ? 'كل المقالات' : 'All Articles'}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="related-posts-ellipse mt-5 pt-5" style={{ borderTop: '1px solid #e0e0e0' }}>
                <h4 className="text-dark fw-bold mb-4">
                  <i className="fa fa-link text-primary me-2"></i>
                  {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                </h4>
                <div className="row g-4">
                  {relatedPosts.map((related) => (
                    <div className="col-md-4" key={related.id}>
                      <Link to={`/blog/${related.id}`} className="text-decoration-none">
                        <div className="ellipse-related-card bg-white rounded-4 overflow-hidden h-100 shadow-sm">
                          <div className="p-4 text-center" style={{ background: related.gradient, borderRadius: '16px 16px 0 0' }}>
                            <i className={`fa ${related.image} fa-2x text-white mb-3 d-block`}></i>
                            <h6 className="text-white mb-2 fw-semibold small">{isAr ? related.titleAr : related.titleEn}</h6>
                            <small className="text-white opacity-80">{related.date}</small>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  )
}

export default BlogPost