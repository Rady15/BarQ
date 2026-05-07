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
    excerptEn: 'Discover how AI agents can revolutionize your business operations.',
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
    excerptAr: 'تعلم كيف يمكنك أتمتة عملياتك التجارية لتقليل التكاليف.',
    excerptEn: 'Learn how you can automate your business processes.',
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
    excerptAr: 'استكشف أحدث اتجاهات تطوير تطبيقات الويب.',
    excerptEn: 'Explore the latest web application development trends.',
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
    excerptAr: 'الموقع الإلكتروني هو واجهة عملك على الإنترنت.',
    excerptEn: 'Your website is your business face on the internet.',
    image: 'fa-globe-americas',
    category: 'Web',
    categoryAr: 'تطوير الويب',
    date: '2026-04-15',
    readTime: '4'
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
      <div className="container-fluid p-0">
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
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <Spinner loading={loading} />
      <Navbar />

      <div style={{
        backgroundImage: 'url(/img/services/blog.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '50vh'
      }}>
        <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', minHeight: '50vh', paddingTop: '80px' }}>
          <div className="container py-5">
            <Link to="/blog" className="text-white text-decoration-none mb-4 d-inline-block">
              <i className={`fa fa-arrow-${isAr ? 'right' : 'left'} me-2`}></i>
              {isAr ? 'العودة للمقالات' : 'Back to Articles'}
            </Link>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <span className="badge bg-white text-primary px-4 py-2 rounded-pill mb-4 d-inline-block">
                  {isAr ? post.categoryAr : post.category}
                </span>
                <h1 className="display-4 fw-bold text-white mb-4">
                  {isAr ? post.titleAr : post.titleEn}
                </h1>
                <div className="d-flex align-items-center gap-4 text-white">
                  <span><i className="fa fa-calendar me-2"></i>{post.date}</span>
                  <span><i className="fa fa-clock-o me-2"></i>{post.readTime} {isAr ? 'دقيقة قراءة' : 'min read'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5" style={{ backgroundColor: '#F7FAFF' }}>
        <div className="container px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm">
                <p className="lead text-dark mb-4">
                  {isAr ? post.excerptAr : post.excerptEn}
                </p>

                {isAr ? (
                  <>
                    <h2 className="text-primary mt-5 mb-3">مقدمة</h2>
                    <p className="text-muted mb-4">
                      في عالم الأعمال الحديث، أصبح الذكاء الاصطناعي ضرورة حالية لكل مؤسسة تسعى للنمو والتميز.
                    </p>
                    <h2 className="text-primary mt-5 mb-3">الفوائد الرئيسية</h2>
                    <ul className="mb-4">
                      <li className="mb-2">توفير التكاليف</li>
                      <li className="mb-2">السرعة في التنفيذ</li>
                      <li className="mb-2">الدقة</li>
                      <li className="mb-2">التوفر المستمر</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="text-primary mt-5 mb-3">Introduction</h2>
                    <p className="text-muted mb-4">
                      In today's business world, AI is a current necessity for organizations seeking growth.
                    </p>
                    <h2 className="text-primary mt-5 mb-3">Key Benefits</h2>
                    <ul className="mb-4">
                      <li className="mb-2">Cost Savings</li>
                      <li className="mb-2">Speed</li>
                      <li className="mb-2">Accuracy</li>
                      <li className="mb-2">24/7 Availability</li>
                    </ul>
                  </>
                )}

                <div className="mt-5 pt-4 border-top">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-muted">{isAr ? 'مشاركة:' : 'Share:'}</span>
                    <Link to="/blog" className="btn btn-primary rounded-pill px-4">
                      <i className="fa fa-list me-2"></i>
                      {isAr ? 'كل المقالات' : 'All Articles'}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h4 className="text-dark fw-bold mb-4">
                  {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                </h4>
                <div className="row g-4">
                  {relatedPosts.map((related) => (
                    <div className="col-md-4" key={related.id}>
                      <Link to={`/blog/${related.id}`} className="text-decoration-none">
                        <div className="bg-white rounded-4 overflow-hidden h-100 shadow-sm">
                          <div className="p-4 text-center" style={{ background: 'linear-gradient(135deg, #2124B1 0%, #4777F5 100%)' }}>
                            <i className={`fa ${related.image} fa-2x text-white mb-3 d-block`}></i>
                            <h6 className="text-white mb-2">{isAr ? related.titleAr : related.titleEn}</h6>
                            <small className="text-white">{related.date}</small>
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