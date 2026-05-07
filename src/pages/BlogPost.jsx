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
    contentAr: `
      في عالم الأعمال الحديث، أصبح الذكاء الاصطناعي ليس مجرد تقنية مستقبلية، بل ضرورة حالية لكل مؤسسة تسعى للنمو والتميز.
      
      ## ما هو الوكيل الذكي (AI Agent)؟
      
      الوكيل الذكي هو نظام برمجي متطور يعمل كموظف رقمي مستقل، قادر على:
      - فهم المهام وتنفيذها ذاتياً
      - التعلم من البيانات واتخاذ قرارات ذكية
      - التواصل مع العملاء بشكل طبيعي
      - أتمتة العمليات المتكررة
      
      ## فوائد تطبيق الوكلاء الذكيين
      
      1. **توفير التكاليف**: تقليل الاعتماد على العمالة البشرية في المهام الروتينية
      2. **السرعة**: تنفيذ المهام في ثوانٍ بدلاً من ساعات
      3. **الدقة**: تجنب الأخطاء البشرية
      4. **التوفر**: العمل على مدار الساعة بدون استراحة
      
      ## قصص نجاح
      
     _many الشركات_الرائدة_ التي_اعتمدت_ على_الوكلاء_الذكيين_ حققت_نتائج_مذهلة_
    `,
    contentEn: `
      In today's business world, AI is not just a future technology, but a current necessity for any organization seeking growth and excellence.
      
      ## What is an AI Agent?
      
      An AI agent is a sophisticated software system that works as an independent digital employee, capable of:
      - Understanding and executing tasks autonomously
      - Learning from data and making smart decisions
      - Communicating with customers naturally
      - Automating repetitive operations
      
      ## Benefits of Implementing AI Agents
      
      1. **Cost Savings**: Reduce reliance on human labor for routine tasks
      2. **Speed**: Execute tasks in seconds instead of hours
      3. **Accuracy**: Avoid human errors
      4. **Availability**: Work around the clock without breaks
      
      ## Success Stories
      
      Many leading companies that adopted AI agents achieved remarkable results.
    `
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
    contentAr: `
      الأتمتة هي المفتاح لتحقيق كفاءة أكبر في أي مؤسسة. من خلال تحويل العمليات اليدوية إلى عمليات آلية، يمكنك توفير الوقت والموارد مع تحسين الجودة.
      
      ## ما هي أتمتة العمليات؟
      
      أتمتة العمليات هي استخدام التقنيات الحديثة لتنفيذ المهام المتكررة دون تدخل بشري، مما يسمح للموظفين بالتركيز على المهام الإبداعية والاستراتيجية.
      
      ## أنواع الأتمتة
      
      1. **أتمتة المهام الروتينية**: مثل إدخال البيانات وإرسال البريد الإلكتروني
      2. **أتمتة سير العمل**: تنسيق المهام بين الأقسام المختلفة
      3. **أتمتة ذكية**: استخدام الذكاء الاصطناعي لاتخاذ القرارات
      
      ## فوائد الأتمتة
      
      - تقليل التكاليف التشغيلية
      - تحسين دقة وجودة العمل
      - تسريع إنجاز المهام
      - توفر الوقت للموظفين
    `,
    contentEn: `
      Automation is the key to achieving greater efficiency in any organization. By converting manual processes to automated ones, you can save time and resources while improving quality.
      
      ## What is Process Automation?
      
      Process automation is using modern technologies to execute repetitive tasks without human intervention, allowing employees to focus on creative and strategic tasks.
      
      ## Types of Automation
      
      1. **Routine Task Automation**: Like data entry and sending emails
      2. **Workflow Automation**: Coordinating tasks between departments
      3. **Intelligent Automation**: Using AI to make decisions
      
      ## Benefits of Automation
      
      - Reduce operational costs
      - Improve work accuracy and quality
      - Speed up task completion
      - Free up employee time
    `
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
    contentAr: `
      يشهد مجال تطوير تطبيقات الويب تطورات سريعة ومستمرة. في 2026، نشهد ظهور تقنيات جديدة ستغير طريقة بناء التطبيقات.
      
      ## أهم الاتجاهات في 2026
      
      1. **التطبيقات التقدمية (PWA)**: توفر تجربة مستخدم مشابهة للتطبيقات الأصلية
      
      2. **الذكاء الاصطناعي التكامي**: دمج قدرات الذكاء الاصطناعي في التطبيقات
      
      3. **الأمان المتقدم**: استخدام المصادقة البيومترية
      
      4. **الواجهات الصوتية**: دعم التفاعل الصوتي
      
      ## لماذا تختار PWA؟
      
      - العمل دون اتصال بالإنترنت
      - سرعة التحميل
      - تكلفة تطوير أقل
      - التحديث التلقائي
    `,
    contentEn: `
      The field of web application development continues to evolve rapidly. In 2026, we see new technologies that will change how applications are built.
      
      ## Top Trends in 2026
      
      1. **Progressive Web Apps (PWA)**: Provide native-like user experience
      
      2. **Integrative AI**: Integrating AI capabilities into applications
      
      3. **Advanced Security**: Using biometric authentication
      
      4. **Voice Interfaces**: Supporting voice interaction
      
      ## Why Choose PWA?
      
      - Work offline
      - Faster loading
      - Lower development cost
      - Automatic updates
    `
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
    contentAr: `
      في عصر الرقمية، الموقع الإلكتروني ليس مجرد امتياز، بل ضرورة لكل شركة تسعى للنجاح.
      
      ## فوائد الموقع الإلكتروني الاحترافي
      
      1. **الوجود المستمر**: متاح للعملاء على مدار الساعة
      
      2. **التسويق الفعال**: الوصول لجمهور أوسع بتكلفة أقل
      
      3. **المصداقية**: الانطباع الأول يُظهر اح professionalism
      
      4. **خدمة العملاء**: إجابة على استفسارات العملاء
      
      5. **التكلفة المنخفضة**: مقارنة بإيجارات المحلات
      
      ## ما الذي يميز الموقع الاحترافي؟
      
      - تصميم جذاب ومتجاوب
      - سرعة تحميل عالية
      - تحسين محركات البحث
      - الأمان والحماية
    `,
    contentEn: `
      In the digital age, a website is not just a luxury, but a necessity for any company seeking success.
      
      ## Benefits of a Professional Website
      
      1. **Continuous Presence**: Available to customers 24/7
      
      2. **Effective Marketing**: Reach wider audience at lower cost
      
      3. **Credibility**: First impression shows professionalism
      
      4. **Customer Service**: Answer customer inquiries
      
      5. **Low Cost**: Compared to physical store rentals
      
      ## What Makes a Professional Website?
      
      - Attractive and responsive design
      - Fast loading speed
      - Search engine optimization
      - Security and protection
    `
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
      <div className="container-fluid bg-white p-0">
        <Spinner loading={loading} />
        <Navbar />
        <div className="container-xxl py-5">
          <div className="container px-lg-5 text-center">
            <i className="fa fa-exclamation-circle fa-4x text-muted mb-4"></i>
            <h3>{isAr ? 'المقال غير موجود' : 'Article not found'}</h3>
            <Link to="/blog" className="btn btn-primary mt-4 rounded-pill">
              {isAr ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container-fluid bg-white p-0">
      <Spinner loading={loading} />
      <Navbar />

      <div className="blog-post-hero position-relative py-5">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary" style={{ opacity: 0.05 }}></div>
        <div className="container-xxl py-5">
          <div className="container px-lg-5">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="text-center mb-4">
                  <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">
                    {isAr ? post.categoryAr : post.category}
                  </span>
                  <h1 className="display-4 fw-bold text-dark mb-4" style={{ lineHeight: '1.3' }}>
                    {isAr ? post.titleAr : post.titleEn}
                  </h1>
                  <div className="d-flex align-items-center justify-content-center text-muted gap-4">
                    <span>
                      <i className={`fa fa-calendar ${isAr ? 'ms-2' : 'me-2'}`}></i>
                      {post.date}
                    </span>
                    <span>
                      <i className={`fa fa-clock-o ${isAr ? 'ms-2' : 'me-2'}`}></i>
                      {post.readTime} {isAr ? 'دقيقة قراءة' : 'min read'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="blog-content bg-white rounded shadow-sm p-4 p-md-5">
                <div className="blog-featured-image mb-5 text-center">
                  <div className="bg-light rounded d-inline-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                    <i className={`fa ${post.image} fa-4x text-primary opacity-50`}></i>
                  </div>
                </div>

                <div className="blog-body" style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                  <p className="lead mb-4">
                    {isAr ? post.excerptAr : post.excerptEn}
                  </p>
                  
                  <div className="blog-text">
                    {(isAr ? post.contentAr : post.contentEn).split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('## ')) {
                        const title = paragraph.replace('## ', '');
                        return (
                          <h3 key={idx} className="mt-5 mb-3 text-primary" style={{ fontSize: '1.5rem' }}>
                            {title}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                        const items = paragraph.split('\n').filter(p => p.match(/^[1-4]\./));
                        return (
                          <ul key={idx} className="list-unstyled mb-4">
                            {items.map((item, i) => {
                              const text = item.replace(/^[1-4]\.\s*\*?\*?/, '').replace(/\*?\*?$/, '');
                              return (
                                <li key={i} className="mb-2 d-flex align-items-start">
                                  <i className={`fa fa-check-circle text-primary mt-1 ${isAr ? 'ms-2' : 'me-2'}`}></i>
                                  <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></span>
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }
                      if (paragraph.includes(':')) {
                        return (
                          <p key={idx} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                        );
                      }
                      return (
                        <p key={idx} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                      );
                    })}
                  </div>

                  <div className="blog-share mt-5 pt-4 border-top">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted">{isAr ? 'مشاركة:' : 'Share:'}</span>
                        <button className="btn btn-sm btn-outline-primary rounded-circle">
                          <i className="fa fa-facebook"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-primary rounded-circle">
                          <i className="fa fa-twitter"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-primary rounded-circle">
                          <i className="fa fa-linkedin"></i>
                        </button>
                      </div>
                      <Link to="/blog" className="btn btn-primary px-4 rounded-pill">
                        <i className={`fa fa-arrow-${isAr ? 'right' : 'left'} ${isAr ? 'me-2' : 'ms-2'}`}></i>
                        {isAr ? 'المقالات الأخرى' : 'Other Articles'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="related-posts mt-5">
                <h4 className="mb-4 text-primary border-bottom pb-2">
                  {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                </h4>
                <div className="row g-4">
                  {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost, idx) => (
                    <div className={`col-md-4 scroll-reveal ${idx % 2 === 0 ? 'from-left' : 'from-right'}`} key={relatedPost.id}>
                      <Link to={`/blog/${relatedPost.id}`} className="blog-card text-decoration-none">
                        <div className="bg-light rounded p-4 text-center h-100">
                          <i className={`fa ${relatedPost.image} fa-2x text-primary opacity-50 mb-3`}></i>
                          <h6 className="text-dark mb-2">{isAr ? relatedPost.titleAr : relatedPost.titleEn}</h6>
                          <small className="text-muted">{relatedPost.date}</small>
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