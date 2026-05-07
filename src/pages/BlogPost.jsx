import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner } from '../hooks/useAnimations';
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

const BlogPost = () => {
  const loading = useSpinner();
  const { id } = useParams();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = blogPosts.find(p => p.id === parseInt(id));
  const relatedPosts = blogPosts.filter(p => p.id !== parseInt(id)).slice(0, 3);

  if (!post) {
    return (
      <div className="container-fluid bg-light p-0">
        <Spinner loading={loading} />
        <Navbar />
        <div className="container-xxl py-5">
          <div className="container px-lg-5 text-center py-5">
            <i className="fa fa-exclamation-circle fa-5x text-muted opacity-25"></i>
            <h2 className="text-dark mt-4">{isAr ? 'المقال غير موجود' : 'Article Not Found'}</h2>
            <Link to="/blog" className="btn btn-primary rounded-pill mt-4">
              {isAr ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light p-0">
      <Spinner loading={loading} />
      <Navbar />

      <div className="post-hero-modern position-relative overflow-hidden" style={{ 
        backgroundImage: 'url(/img/services/blog.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}>
        <div className="container-xxl py-5">
          <div className="container px-lg-5 py-5">
            <Link to="/blog" className="back-link-modern d-inline-flex align-items-center text-white text-decoration-none mb-4">
              <i className={`fa fa-arrow-${isAr ? 'right' : 'left'} me-2`}></i>
              {isAr ? 'العودة للمقالات' : 'Back to Articles'}
            </Link>
            
            <div className="row align-items-center">
              <div className="col-lg-8">
                <span className="badge bg-white bg-opacity-25 text-white px-4 py-2 rounded-pill mb-4 d-inline-block">
                  {isAr ? post.categoryAr : post.category}
                </span>
                <h1 className="display-4 fw-bold text-white mb-4" style={{ lineHeight: '1.25' }}>
                  {isAr ? post.titleAr : post.titleEn}
                </h1>
                <div className="post-meta-modern d-flex align-items-center gap-4 text-white" style={{ opacity: 0.9 }}>
                  <span><i className="fa fa-calendar me-2"></i>{post.date}</span>
                  <span><i className="fa fa-clock-o me-2"></i>{post.readTime} {isAr ? 'دقيقة قراءة' : 'min read'}</span>
                </div>
              </div>
              <div className="col-lg-4 d-none d-lg-block text-center">
                <div className="post-icon-modern d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10" style={{ width: '140px', height: '140px', border: '2px solid rgba(255,255,255,0.3)' }}>
                  <i className={`fa ${post.image} fa-4x text-white`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="post-content-modern py-5" style={{ background: '#F7FAFF' }}>
          <div className="container-xxl py-5">
            <div className="container px-lg-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="post-body-modern bg-white rounded-4 p-4 p-md-5 shadow-sm">
                    <p className="lead text-dark mb-5" style={{ fontSize: '1.25rem', lineHeight: '1.9' }}>
                      {isAr ? post.excerptAr : post.excerptEn}
                    </p>
                    
                    {isAr ? (
                      <>
                        <h2 className="text-primary mb-4">مقدمة</h2>
                        <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                          في عالم الأعمال الحديث، أصبح الذكاء الاصطناعي ليس مجرد تقنية مستقبلية، بل ضرورة حالية لكل مؤسسة تسعى للنمو والتميز. إن تبني هذه التقنيات يمكن أن يحدث فرقاً كبيراً في نتائج عملك ويمنحك ميزة تنافسية قوية في السوق المحلي والعالمي.
                        </p>
                        <h2 className="text-primary mt-5 mb-4">ما هو الوكيل الذكي؟</h2>
                        <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                          الوكيل الذكي هو نظام برمجي متطور يعمل كموظف رقمي مستقل، قادر على فهم المهام وتنفيذها ذاتياً دون الحاجة لتدخل بشري مستمر. يمكنه التعلم من البيانات واتخاذ قرارات ذكية بناءً على أنماط محددة مسبقاً.
                        </p>
                        <h2 className="text-primary mt-5 mb-4">الفوائد الرئيسية</h2>
                        <div className="benefits-modern mb-4">
                          {[
                            { title: 'توفير التكاليف', desc: 'تقليل الاعتماد على العمالة البشرية في المهام الروتينية والمتكررة', icon: 'fa-coins' },
                            { title: 'السرعة', desc: 'تنفيذ المهام في ثوانٍ بدلاً من ساعات أو أيام', icon: 'fa-bolt' },
                            { title: 'الدقة', desc: 'تجنب الأخطاء البشرية بنسبة تصل إلى 99%', icon: 'fa-check-circle' },
                            { title: 'التوفر', desc: 'العمل على مدار الساعة طوال أيام الأسبوع', icon: 'fa-clock' }
                          ].map((item, i) => (
                            <div key={i} className="benefit-item-modern d-flex align-items-start p-4 rounded-4 mb-3 bg-light">
                              <div className="benefit-icon-modern bg-primary rounded-circle me-4 d-flex align-items-center justify-content-center text-white" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                                <i className={`fa ${item.icon}`}></i>
                              </div>
                              <div>
                                <h5 className="text-dark mb-2">{item.title}</h5>
                                <p className="text-muted mb-0">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <h2 className="text-primary mt-5 mb-4">الخاتمة</h2>
                        <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                          الذكاء الاصطناعي هو المستقبل، والشركات التي تتبناه مبكراً ستحصل على ميزة تنافسية كبيرة في السوق. ابدأ اليوم وحوّل عملك نحو النجاح والتميّز.
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-primary mb-4">Introduction</h2>
                        <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                          In today's business world, AI is not just a future technology, but a current necessity for any organization seeking growth and excellence.
                        </p>
                        <h2 className="text-primary mt-5 mb-4">What is an AI Agent?</h2>
                        <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                          An AI agent is a sophisticated software system that works as an independent digital employee, capable of understanding and executing tasks autonomously.
                        </p>
                        <h2 className="text-primary mt-5 mb-4">Key Benefits</h2>
                        <div className="benefits-modern mb-4">
                          {[
                            { title: 'Cost Savings', desc: 'Reduce reliance on human labor for routine tasks', icon: 'fa-coins' },
                            { title: 'Speed', desc: 'Execute tasks in seconds not hours', icon: 'fa-bolt' },
                            { title: 'Accuracy', desc: 'Avoid human errors up to 99%', icon: 'fa-check-circle' },
                            { title: 'Availability', desc: 'Work 24/7 without breaks', icon: 'fa-clock' }
                          ].map((item, i) => (
                            <div key={i} className="benefit-item-modern d-flex align-items-start p-4 rounded-4 mb-3 bg-light">
                              <div className="benefit-icon-modern bg-primary rounded-circle me-4 d-flex align-items-center justify-content-center text-white" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                                <i className={`fa ${item.icon}`}></i>
                              </div>
                              <div>
                                <h5 className="text-dark mb-2">{item.title}</h5>
                                <p className="text-muted mb-0">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <h2 className="text-primary mt-5 mb-4">Conclusion</h2>
                        <p className="text-muted mb-4" style={{ lineHeight: '1.9' }}>
                          AI is the future. Companies that adopt it early will gain a significant competitive advantage.
                        </p>
                      </>
                    )}

                    <div className="post-share-modern mt-5 pt-4" style={{ borderTop: '2px solid #f0f0f0' }}>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div className="d-flex align-items-center gap-3">
                          <span className="text-muted">{isAr ? 'مشاركة:' : 'Share:'}</span>
                          <div className="d-flex gap-2">
                            {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((social, i) => (
                              <button key={i} className="btn btn-sm btn-outline-primary rounded-circle">
                                <i className={`fa fa-${social}`}></i>
                              </button>
                            ))}
                          </div>
                        </div>
                        <Link to="/blog" className="btn btn-primary rounded-pill px-4">
                          <i className={`fa fa-list me-2`}></i>
                          {isAr ? 'كل المقالات' : 'All Articles'}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="related-posts-modern mt-5">
                    <h4 className="text-dark fw-bold mb-4">
                      <i className="fa fa-link text-primary me-2"></i>
                      {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                    </h4>
                    <div className="row g-4">
                      {relatedPosts.map((related, i) => (
                        <div className="col-md-4" key={related.id}>
                          <Link to={`/blog/${related.id}`} className="text-decoration-none">
                            <div className="related-card-modern bg-white rounded-4 overflow-hidden h-100 shadow-sm">
                              <div className="p-4 text-center" style={{ background: 'linear-gradient(135deg, #2124B1 0%, #4777F5 100%)' }}>
                                <i className={`fa ${related.image} fa-2x text-white mb-3 d-block`}></i>
                                <h6 className="text-white mb-2">{isAr ? related.titleAr : related.titleEn}</h6>
                                <small className="text-white" style={{ opacity: 0.8 }}>{related.date}</small>
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
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default BlogPost;