import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useSpinner } from '../hooks/useAnimations';
import { useLanguage } from '../context/LanguageContext';
import { useBlogPosts } from './Blog';

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

const BlogPost = () => {
  const loading = useSpinner();
  const { id } = useParams();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="container-fluid bg-light p-0">
        <Spinner loading={loading} />
        <Navbar />
        <div className="container-xxl py-5">
          <div className="container px-lg-5 text-center py-5">
            <i className="fa fa-exclamation-circle fa-5x text-muted opacity-50 mb-4 d-block"></i>
            <h2 className="text-dark mb-4">{isAr ? 'المقال غير موجود' : 'Article Not Found'}</h2>
            <Link to="/blog" className="btn btn-primary px-5 rounded-pill">
              {isAr ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id);

  return (
    <div className="container-fluid bg-light p-0">
      <Spinner loading={loading} />
      <Navbar />

      <div className="post-hero" style={{ background: post.color }}>
        <div className="hero-overlay"></div>
        <div className="container-xxl py-5">
          <div className="container px-lg-5 py-5">
            <div className="row justify-content-center">
              <div className="col-lg-10 text-center">
                <Link 
                  to="/blog" 
                  className="back-link d-inline-flex align-items-center text-white mb-4 text-decoration-none"
                >
                  <i className={`fa fa-arrow-${isAr ? 'right' : 'left'} me-2`}></i>
                  {isAr ? 'العودة للمقالات' : 'Back to Articles'}
                </Link>
                
                <span className="badge bg-white text-dark px-4 py-2 rounded-pill mb-4 d-block mx-auto" style={{ width: 'fit-content' }}>
                  {isAr ? post.categoryAr : post.category}
                </span>
                
                <h1 className="display-4 fw-bold text-white mb-4" style={{ lineHeight: '1.3' }}>
                  {isAr ? post.titleAr : post.titleEn}
                </h1>
                
                <div className="d-flex align-items-center justify-content-center text-white gap-4 flex-wrap">
                  <span><i className={`fa fa-calendar me-2 opacity-75`}></i>{post.date}</span>
                  <span><i className="fa fa-clock-o me-2 opacity-75"></i>{post.readTime} {isAr ? 'دقيقة قراءة' : 'min read'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="post-content bg-white rounded-4 p-4 p-md-5 shadow-sm">
                <div className="post-icon text-center mb-5">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '120px', height: '120px', background: post.color }}>
                    <i className={`fa ${post.image} fa-4x text-white`}></i>
                  </div>
                </div>

                <div className="post-body" style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                  <p className="lead text-dark mb-5" style={{ fontSize: '1.25rem' }}>
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                  
                  <div className="post-paragraphs">
                    {isAr ? (
                      <>
                        <p className="mb-4">
                          في عالم الأعمال الحديث، أصبح الذكاء الاصطناعي ليس مجرد تقنية مستقبلية، بل ضرورة حالية لكل مؤسسة تسعى للنمو والتميز. إن تبني هذه التقنيات يمكن أن يحدث فرقاً كبيراً في نتائج عملك.
                        </p>
                        <h3 className="text-primary mt-5 mb-3">ما هو الوكيل الذكي (AI Agent)؟</h3>
                        <p className="mb-4">
                          الوكيل الذكي هو نظام برمجي متطور يعمل كموظف رقمي مستقل، قادر على فهم المهام وتنفيذها ذاتياً دون الحاجة لتدخل بشري مستمر.
                        </p>
                        <h3 className="text-primary mt-5 mb-3">فوائد تطبيق الوكلاء الذكيين</h3>
                        <ul className="list-unstyled mb-4">
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>توفير التكاليف:</strong> تقليل الاعتماد على العمالة البشرية في المهام الروتينية</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>السرعة:</strong> تنفيذ المهام في ثوانٍ بدلاً من ساعات</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>الدقة:</strong> تجنب الأخطاء البشرية</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>التوفر:</strong> العمل على مدار الساعة بدون استراحة</span>
                          </li>
                        </ul>
                        <h3 className="text-primary mt-5 mb-3">الخاتمة</h3>
                        <p className="mb-4">
                          الذكاء الاصطناعي هو المستقبل، والشركات التي تتبناه مبكراً ستحصل على ميزة تنافسية كبيرة في السوق.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mb-4">
                          In today's business world, AI is not just a future technology, but a current necessity for any organization seeking growth and excellence. Adopting these technologies can make a big difference in your business outcomes.
                        </p>
                        <h3 className="text-primary mt-5 mb-3">What is an AI Agent?</h3>
                        <p className="mb-4">
                          An AI agent is a sophisticated software system that works as an independent digital employee, capable of understanding and executing tasks autonomously without continuous human intervention.
                        </p>
                        <h3 className="text-primary mt-5 mb-3">Benefits of Implementing AI Agents</h3>
                        <ul className="list-unstyled mb-4">
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>Cost Savings:</strong> Reduce reliance on human labor for routine tasks</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>Speed:</strong> Execute tasks in seconds instead of hours</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>Accuracy:</strong> Avoid human errors</span>
                          </li>
                          <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-primary mt-1 me-3"></i>
                            <span><strong>Availability:</strong> Work around the clock without breaks</span>
                          </li>
                        </ul>
                        <h3 className="text-primary mt-5 mb-3">Conclusion</h3>
                        <p className="mb-4">
                          AI is the future, and companies that adopt it early will gain a significant competitive advantage in the market.
                        </p>
                      </>
                    )}
                  </div>

                  <div className="post-share mt-5 pt-4 border-top">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <span className="text-muted">{isAr ? 'مشاركة:' : 'Share:'}</span>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-outline-primary rounded-circle">
                            <i className="fa fa-facebook"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-primary rounded-circle">
                            <i className="fa fa-twitter"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-primary rounded-circle">
                            <i className="fa fa-linkedin"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-primary rounded-circle">
                            <i className="fa fa-whatsapp"></i>
                          </button>
                        </div>
                      </div>
                      <Link to="/blog" className="btn btn-primary px-4 rounded-pill">
                        <i className={`fa fa-list me-2`}></i>
                        {isAr ? 'كل المقالات' : 'All Articles'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="related-posts mt-5">
                <h4 className="mb-4 text-dark fw-bold border-bottom pb-3">
                  <i className="fa fa-link text-primary me-2"></i>
                  {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                </h4>
                <div className="row g-4">
                  {relatedPosts.map((relatedPost, idx) => (
                    <div className="col-md-4" key={relatedPost.id}>
                      <Link to={`/blog/${relatedPost.id}`} className="text-decoration-none">
                        <div className="related-card bg-white rounded-4 overflow-hidden h-100" style={{ background: relatedPost.color }}>
                          <div className="p-4 text-center">
                            <i className={`fa ${relatedPost.image} fa-2x text-white mb-3 d-block`}></i>
                            <h6 className="text-white mb-2">{isAr ? relatedPost.titleAr : relatedPost.titleEn}</h6>
                            <small className="text-white" style={{ opacity: 0.8 }}>{relatedPost.date}</small>
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
  );
};

export default BlogPost;