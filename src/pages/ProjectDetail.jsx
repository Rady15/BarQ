import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import BackToTop from '../components/BackToTop';
import { useLanguage } from '../context/LanguageContext';
import { api, getImageUrl } from '../utils/api';
import { useSpinner, useWow } from '../hooks/useAnimations';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  
  const loading = useSpinner();
  useWow();

  const [project, setProject] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const data = await api.get('/projects');
        const found = data.find(p => p.id === parseInt(id));
        if (found) {
          setProject(found);
        } else {
          navigate('/portfolio', { replace: true });
        }
      } catch (err) {
        console.error('Error fetching project details:', err);
        navigate('/portfolio', { replace: true });
      } finally {
        setFetching(false);
      }
    };
    fetchProjectDetails();
  }, [id, navigate]);

  if (fetching || !project) {
    return <Spinner loading={true} />;
  }

  // Parse features list dynamically from database
  let dbFeatures = [];
  try {
    dbFeatures = JSON.parse(project.features_json || '[]');
  } catch (e) {
    dbFeatures = [];
  }

  // If no features are created in the database, supply rich default services cards
  if (!dbFeatures || dbFeatures.length === 0) {
    dbFeatures = [
      {
        titleAr: 'ربط الأنظمة الرقمية',
        titleEn: 'System Integrations',
        icon: 'fa-link',
        descAr: 'دمج كافة العمليات والبيانات في واجهة موحدة سهلة الاستخدام وعصرية.',
        descEn: 'Unifying all operations and data points into a single, intuitive and modern interface.'
      },
      {
        titleAr: 'التقارير الذكية والمؤشرات',
        titleEn: 'Smart Analytics',
        icon: 'fa-chart-line',
        descAr: 'إصدار تقارير لحظية دقيقة تساعد الإدارة في اتخاذ القرارات المصيرية للمشروع.',
        descEn: 'Real-time performance metrics helping owners make vital data-driven decisions.'
      },
      {
        titleAr: 'واجهة مستخدم احترافية',
        titleEn: 'Premium UI/UX Layout',
        icon: 'fa-desktop',
        descAr: 'تصميم تجربة مستخدم سلسة وعصرية مع حركات جذابة تتناسب مع متطلبات السوق.',
        descEn: 'Stunning, fluid and highly responsive layout built for excellent daily system workflows.'
      }
    ];
  }

  const details = {
    sectorAr: project.sector_ar || project.category || 'قطاع البرمجيات والأنظمة',
    sectorEn: project.sector_en || project.category || 'Software & Enterprise Systems',
    valueAr: project.value_ar || 'تقديم واجهة رقمية ممتازة سهلت عمليات الإدارة وعملت على تسريع دورة نمو الأعمال وتكامل أقسام الشركة.',
    valueEn: project.value_en || 'Delivered an exceptional digital system that simplified operations, integrated corporate divisions and accelerated growth.',
    impactMetric: project.impact_metric || '100%',
    impactLabelAr: project.impact_label_ar || 'دقة وتكامل الأداء الرقمي للمشروع',
    impactLabelEn: project.impact_label_en || 'Digital operation precision & compliance',
    features: dbFeatures
  };

  return (
    <div className="container-fluid bg-white p-0 overflow-hidden">
      <Navbar />

      {/* Futuristic Hero Banner Section */}
      <div className="project-detail-hero position-relative d-flex align-items-center justify-content-center" style={{ backgroundImage: `linear-gradient(rgba(5, 29, 71, 0.9), rgba(5, 29, 71, 0.9)), url(${project.image ? getImageUrl(project.image) : "https://taharica.co.id/wp-content/uploads/2025/03/Artikel-Taharica-odoo.jpg"})` }}>
        <div className="container px-lg-5 text-center text-white z-index-2 scroll-reveal from-bottom">
          <div className="badge bg-cyan text-dark px-3 py-2 rounded-pill mb-3 fw-bold tracking-wider fs-7">
            {isAr ? details.sectorAr : details.sectorEn}
          </div>
          <h1 className="display-4 fw-extrabold mb-3 text-white tracking-tight animate-fade-in">
            {isAr ? project.title_ar : project.title_en}
          </h1>
          <p className="lead text-white-50 max-w-700 mx-auto mb-4" style={{ lineHeight: '1.8' }}>
            {isAr ? project.description_ar : project.description_en}
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <span className="badge bg-light-transparent text-white px-3 py-2 rounded-pill">
              <i className="fa fa-user me-2 ms-2"></i>
              {isAr ? 'العميل: ' : 'Client: '}
              {project.client_name || (isAr ? 'برق تك' : 'Barq Tech')}
            </span>
            <span className="badge bg-light-transparent text-white px-3 py-2 rounded-pill">
              <i className="fa fa-tag me-2 ms-2"></i>
              {isAr ? 'الحالة: منجز بالكامل' : 'Status: Fully Completed'}
            </span>
          </div>
        </div>
        <div className="hero-shape-bottom"></div>
      </div>

      {/* Main Core Showcase */}
      <div className="container py-5 px-lg-5">
        <div className="row g-5 align-items-stretch">
          
          {/* Left Column: Scope & Overview */}
          <div className="col-lg-7 d-flex flex-column justify-content-between scroll-reveal from-left">
            <div>
              <span className="text-primary uppercase tracking-wider fw-bold small d-block mb-2">
                {isAr ? 'عن التحول الرقمي للمشروع' : 'PROJECT DIGITAL SHOWCASE'}
              </span>
              <h3 className="h2 text-dark fw-bold mb-4">
                {isAr ? 'تفاصيل وقصة نجاح المشروع' : 'Project Success Story & Scope'}
              </h3>
              <p className="text-muted lh-lg mb-4" style={{ fontSize: '1.05rem', textAlign: 'justify' }}>
                {isAr
                  ? `قمنا بتصميم وبناء هذا النظام بالكامل بالاعتماد على دراسة دقيقة لاحتياجات وسير العمل اليومي لدى شريكنا. تم دمج كافة الأقسام التابعة وتوفير نظام متزامن بالكامل يعتمد على السحابة، مما مكن الإدارة من الإشراف المباشر والتحكم الكامل بمختلف المستويات التشغيلية بدقة ومصداقية تامة.`
                  : `We custom-designed and engineered this entire enterprise pipeline based on a granular workflow audit of our client. All operational divisions are seamlessly coupled into a real-time, responsive cloud architecture, empowering executives to maintain absolute transparency and command over daily tasks.`
                }
              </p>
              
              <h5 className="fw-bold text-primary mb-3 mt-4">
                {isAr ? 'المزايا ونقاط القوة التي تم دمجها:' : 'Engineered Strengths & Integrations:'}
              </h5>
              
              <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                <li className="d-flex align-items-center">
                  <i className="fa fa-check-circle text-cyan me-3 ms-3 fs-5"></i>
                  <span className="text-dark fw-semibold">{isAr ? 'أمان سيبراني معزز لحماية سجلات الحسابات والمبيعات' : 'Hardened cybersecurity parameters protecting financial databases'}</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="fa fa-check-circle text-cyan me-3 ms-3 fs-5"></i>
                  <span className="text-dark fw-semibold">{isAr ? 'سرعة استجابة فائقة لمعاملات نقاط البيع وتحديث المخزون' : 'Instantaneous sync of POS transaction records and inventory stock'}</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="fa fa-check-circle text-cyan me-3 ms-3 fs-5"></i>
                  <span className="text-dark fw-semibold">{isAr ? 'توافق تام مع الفوترة الإلكترونية ومعايير هيئة الزكاة والدخل' : 'Full compliance with Zatca e-invoicing standards and local regulations'}</span>
                </li>
              </ul>
            </div>

            {/* Premium CTA box */}
            <div className="bg-light p-4 rounded-4 border-start border-primary border-4 mt-4 shadow-sm">
              <h6 className="fw-bold text-dark mb-2">{isAr ? 'تبحث عن نظام مماثل ومخصص لأعمالك؟' : 'Looking for a similar custom system?'}</h6>
              <p className="text-muted small mb-3">{isAr ? 'مبرمجونا جاهزون لتحليل احتياجاتك وبناء نظام رقمي متكامل يصنع الفارق لشركتك.' : 'Our engineers are ready to audit your workflow and design an elite bespoke platform.'}</p>
              <Link to="/contact" className="btn btn-primary rounded-pill py-2 px-4 shadow-sm animate-pulse-light">
                {isAr ? 'احجز استشارة تقنية مجانية' : 'Book a Free Tech Audit'}
              </Link>
            </div>
          </div>

          {/* Right Column: Spec Cards & Metric circle */}
          <div className="col-lg-5 scroll-reveal from-right">
            <div className="project-specs-card bg-light rounded-4 p-4 shadow-sm border border-light-dark h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-4 pb-2 border-bottom border-light-dark">
                  {isAr ? 'بطاقة المواصفات الفنية' : 'Technical Specification Sheet'}
                </h5>
                
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{isAr ? 'الشريك:' : 'Client Partner:'}</span>
                    <span className="fw-bold text-dark">{project.client_name || (isAr ? 'برق تك' : 'Barq Tech')}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{isAr ? 'القطاع تشغيلي:' : 'Sector:'}</span>
                    <span className="fw-bold text-cyan">{isAr ? details.sectorAr : details.sectorEn}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{isAr ? 'نوع الحل البرمجي:' : 'System Type:'}</span>
                    <span className="fw-bold text-dark">{project.category || 'ERP Cloud Subsystem'}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{isAr ? 'حالة التفعيل:' : 'System Status:'}</span>
                    <span className="badge bg-success-transparent text-success px-2 py-1 rounded-pill">{isAr ? 'نشط ويعمل بالكامل' : 'Fully Live & Operational'}</span>
                  </div>
                </div>


              </div>

              {/* Metric Impact Ring */}
              <div className="metric-ring-container bg-primary text-white p-4 rounded-4 shadow-sm border border-light position-relative overflow-hidden mt-4">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h6 className="fw-bold mb-1 text-cyan">{isAr ? details.impactLabelAr : details.impactLabelEn}</h6>
                    <small className="text-white-50">{isAr ? 'قيمة مضافة تشغيلية حقيقية مقاسة بدقة.' : 'Measured business improvement in key workflow metrics.'}</small>
                  </div>
                  <div className="col-4 text-center">
                    <span className="display-6 fw-extrabold text-white d-block">{details.impactMetric}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Key System Modules (مكونات النظام الإبداعية مع حركات ممتازة) */}
      <div className="container-fluid py-5 bg-light position-relative">
        <div className="container px-lg-5">
          <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
            <span className="text-primary uppercase tracking-wider fw-bold small d-block mb-1">
              {isAr ? 'تفاصيل المكونات البرمجية' : 'SYSTEM ARCHITECTURE'}
            </span>
            <h2 className="mt-2 text-dark fw-bold">
              {isAr ? 'المكونات والأنظمة المتكاملة التي تم توفيرها' : 'Integrated System Modules Delivered'}
            </h2>
          </div>

          <div className="row g-4 justify-content-center">
            {details.features.map((feat, index) => (
              <div className="col-lg-4 col-md-6 scroll-reveal from-bottom" key={index} data-delay={index * 100}>
                <div className="feature-item-card bg-white rounded-4 p-4 shadow-sm border border-light-dark h-100 position-relative overflow-hidden">
                  <div className="card-border-top"></div>
                  <div className="icon-circle bg-primary-transparent text-primary mb-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', borderRadius: '50%', fontSize: '1.4rem' }}>
                    <i className={`fa ${feat.icon}`}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">
                    {isAr ? feat.titleAr : feat.titleEn}
                  </h5>
                  <p className="text-muted small mb-0 lh-base">
                    {isAr ? feat.descAr : feat.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Added Value Showcase (القيمة المضافة بتصميم إبداعي) */}
      <div className="container py-5 px-lg-5 text-center scroll-reveal from-bottom">
        <div className="value-added-banner bg-primary text-white rounded-4 p-5 shadow-lg position-relative overflow-hidden">
          <div className="cover-wave-bottom" style={{ opacity: 0.1, zIndex: 1 }}></div>
          <div className="position-relative z-index-2 max-w-800 mx-auto">
            <div className="icon-badge bg-white-transparent text-white rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '70px', height: '70px' }}>
              <i className="fa fa-medal fa-3x text-cyan animate-pulse"></i>
            </div>
            <span className="text-cyan uppercase tracking-wider fw-bold small d-block mb-2">
              {isAr ? 'القيمة التشغيلية المضافة' : 'MEASURED BUSINESS VALUE'}
            </span>
            <h3 className="display-6 fw-extrabold text-white mb-4">
              {isAr ? 'ما الفارق الذي صنعه نظام برق تك للعميل؟' : 'What Difference Did Our ERP Solution Make?'}
            </h3>
            <p className="lead text-white-50 lh-lg mb-0" style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
              "{isAr ? details.valueAr : details.valueEn}"
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ProjectDetail;
