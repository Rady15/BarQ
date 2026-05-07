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
    readTime: '5',
    color: '#667eea'
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
    color: '#f5576c'
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
    color: '#00f2fe'
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
    color: '#38f9d7'
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
    color: '#a8edea'
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
    color: '#ff9a9e'
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
      <div className="container-fluid p-0" style={{ background: '#0a0a0a' }}>
        <Spinner loading={loading} />
        <Navbar />
        <div className="container-xxl py-5">
          <div className="container px-lg-5 text-center py-5">
            <i className="fa fa-exclamation-circle fa-5x text-white" style={{ opacity: 0.2 }}></i>
            <h2 className="text-white mt-4">{isAr ? 'المقال غير موجود' : 'Article Not Found'}</h2>
            <Link to="/blog" className="btn btn-lg btn-primary rounded-pill mt-4">
              {isAr ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0" style={{ background: '#0a0a0a' }}>
      <Spinner loading={loading} />
      <Navbar />

      <div className="post-hero-v2 position-relative overflow-hidden" style={{ background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)` }}>
        <div className="hero-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              background: post.color
            }}></div>
          ))}
        </div>
        
        <div className="container-xxl py-5">
          <div className="container px-lg-5 py-5">
            <Link to="/blog" className="back-btn-v2 d-inline-flex align-items-center text-white text-decoration-none mb-4">
              <i className={`fa fa-arrow-${isAr ? 'right' : 'left'} me-2`}></i>
              {isAr ? 'العودة للمقالات' : 'Back to Articles'}
            </Link>
            
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="post-category-v2 mb-4" style={{ color: post.color }}>
                  <span className="badge px-4 py-2 rounded-pill" style={{ background: `${post.color}22`, border: `1px solid ${post.color}` }}>
                    {isAr ? post.categoryAr : post.category}
                  </span>
                </div>
                <h1 className="display-3 fw-bold text-white mb-4" style={{ lineHeight: '1.2' }}>
                  {isAr ? post.titleAr : post.titleEn}
                </h1>
                <div className="post-meta-v2 d-flex align-items-center gap-4 flex-wrap">
                  <span className="text-white" style={{ opacity: 0.6 }}>
                    <i className="fa fa-calendar me-2"></i>
                    {post.date}
                  </span>
                  <span className="text-white" style={{ opacity: 0.6 }}>
                    <i className="fa fa-clock-o me-2"></i>
                    {post.readTime} {isAr ? 'دقيقة قراءة' : 'min read'}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 d-none d-lg-block text-end">
                <div className="post-icon-v2 d-inline-flex align-items-center justify-content-center rounded-circle" 
                  style={{ width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', border: `2px solid ${post.color}` }}>
                  <i className={`fa ${post.image} fa-4x`} style={{ color: post.color }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="post-content-v2 py-5">
        <div className="container-xxl py-5">
          <div className="container px-lg-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="post-body-v2">
                  <p className="lead text-white mb-5" style={{ fontSize: '1.3rem', lineHeight: '1.9', opacity: 0.9 }}>
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                  
                  {isAr ? (
                    <>
                      <h2 className="text-white mb-4" style={{ color: post.color }}>مقدمة</h2>
                      <p className="text-white mb-4" style={{ opacity: 0.8, lineHeight: '1.9' }}>
                        في عالم الأعمال الحديث، أصبح الذكاء الاصطناعي ليس مجرد تقنية مستقبلية، بل ضرورة حالية لكل مؤسسة تسعى للنمو والتميز. إن تبني هذه التقنيات يمكن أن يحدث فرقاً كبيراً في نتائج عملك ويمنحك ميزة تنافسية قوية في السوق.
                      </p>
                      <h2 className="text-white mt-5 mb-4" style={{ color: post.color }}>ما هو الوكيل الذكي؟</h2>
                      <p className="text-white mb-4" style={{ opacity: 0.8, lineHeight: '1.9' }}>
                        الوكيل الذكي هو نظام برمجي متطور يعمل كموظف رقمي مستقل، قادر على فهم المهام وتنفيذها ذاتياً دون الحاجة لتدخل بشري مستمر. يمكنه التعلم من البيانات واتخاذ قرارات ذكية.
                      </p>
                      <h2 className="text-white mt-5 mb-4" style={{ color: post.color }}>الفوائد الرئيسية</h2>
                      <div className="benefits-list mb-4">
                        {[
                          { title: 'توفير التكاليف', desc: 'تقليل الاعتماد على العمالة البشرية في المهام الروتينية' },
                          { title: 'السرعة', desc: 'تنفيذ المهام في ثوانٍ بدلاً من ساعات' },
                          { title: 'الدقة', desc: 'تجنب الأخطاء البشرية بنسبة 99%' },
                          { title: 'التوفر', desc: 'العمل على مدار الساعة بدون استراحة' }
                        ].map((item, i) => (
                          <div key={i} className="benefit-item d-flex align-items-start mb-4 p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${post.color}` }}>
                            <div className="benefit-number me-4" style={{ color: post.color, fontSize: '1.5rem', fontWeight: '700' }}>0{i + 1}</div>
                            <div>
                              <h4 className="text-white mb-2">{item.title}</h4>
                              <p className="text-white mb-0" style={{ opacity: 0.7 }}>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <h2 className="text-white mt-5 mb-4" style={{ color: post.color }}>الخاتمة</h2>
                      <p className="text-white mb-4" style={{ opacity: 0.8, lineHeight: '1.9' }}>
                        الذكاء الاصطناعي هو المستقبل، والشركات التي تتبناه مبكراً ستحصل على ميزة تنافسية كبيرة في السوق. ابدأ اليوم وحوّل عملك نحو النجاح.
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-white mb-4" style={{ color: post.color }}>Introduction</h2>
                      <p className="text-white mb-4" style={{ opacity: 0.8, lineHeight: '1.9' }}>
                        In today's business world, AI is not just a future technology, but a current necessity for any organization seeking growth and excellence.
                      </p>
                      <h2 className="text-white mt-5 mb-4" style={{ color: post.color }}>What is an AI Agent?</h2>
                      <p className="text-white mb-4" style={{ opacity: 0.8, lineHeight: '1.9' }}>An AI agent is a sophisticated software system that works as an independent digital employee.</p>
                      <h2 className="text-white mt-5 mb-4" style={{ color: post.color }}>Key Benefits</h2>
                      <div className="benefits-list mb-4">
                        {[
                          { title: 'Cost Savings', desc: 'Reduce reliance on human labor for routine tasks' },
                          { title: 'Speed', desc: 'Execute tasks in seconds instead of hours' },
                          { title: 'Accuracy', desc: 'Avoid human errors by 99%' },
                          { title: 'Availability', desc: 'Work around the clock without breaks' }
                        ].map((item, i) => (
                          <div key={i} className="benefit-item d-flex align-items-start mb-4 p-4 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', borderLeft: `3px solid ${post.color}` }}>
                            <div className="benefit-number me-4" style={{ color: post.color, fontSize: '1.5rem', fontWeight: '700' }}>0{i + 1}</div>
                            <div>
                              <h4 className="text-white mb-2">{item.title}</h4>
                              <p className="text-white mb-0" style={{ opacity: 0.7 }}>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <h2 className="text-white mt-5 mb-4" style={{ color: post.color }}>Conclusion</h2>
                      <p className="text-white mb-4" style={{ opacity: 0.8, lineHeight: '1.9' }}>
                        AI is the future, and companies that adopt it early will gain a significant competitive advantage.
                      </p>
                    </>
                  )}

                  <div className="post-share-v2 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <span className="text-white" style={{ opacity: 0.6 }}>{isAr ? 'مشاركة:' : 'Share:'}</span>
                        <div className="d-flex gap-2">
                          {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((social, i) => (
                            <button key={i} className="btn btn-sm rounded-circle" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                              <i className={`fa fa-${social}`}></i>
                            </button>
                          ))}
                        </div>
                      </div>
                      <Link to="/blog" className="btn btn-lg rounded-pill" style={{ background: post.color, border: 'none' }}>
                        <i className={`fa fa-list me-2`}></i>
                        {isAr ? 'كل المقالات' : 'All Articles'}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="related-posts-v2 mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 className="text-white mb-4">
                    <i className="fa fa-link me-2" style={{ color: post.color }}></i>
                    {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                  </h4>
                  <div className="row g-4">
                    {relatedPosts.map((related, i) => (
                      <div className="col-md-4" key={related.id}>
                        <Link to={`/blog/${related.id}`} className="text-decoration-none">
                          <div className="related-card-v2 h-100" style={{ borderColor: related.color }}>
                            <div className="p-4 text-center">
                              <i className={`fa ${related.image} fa-2x mb-3 d-block`} style={{ color: related.color }}></i>
                              <h6 className="text-white mb-2">{isAr ? related.titleAr : related.titleEn}</h6>
                              <small className="text-white" style={{ opacity: 0.5 }}>{related.date}</small>
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

      <Footer />
      <BackToTop />
    </div>
  );
};

export default BlogPost;