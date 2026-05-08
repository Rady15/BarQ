import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';
import { useLanguage } from '../context/LanguageContext';
import { useSpinner, useWow } from '../hooks/useAnimations';
import { api } from '../utils/api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Faqs = () => {
  const loading = useSpinner();
  useWow();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [faqs, setFaqs] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFaqs = async () => {
      try {
        const data = await api.get('/faqs');
        setFaqs(data);
      } catch (err) {
        console.error('Error fetching faqs:', err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="container-fluid bg-white p-0">
      <Spinner loading={loading} />
      <Navbar />
      <PageHeader 
        title={isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'} 
        breadcrumb={isAr ? 'الأسئلة الشائعة' : 'FAQs'}
      />

      <div className="container py-5 px-lg-5">
        <div className="row g-5 align-items-center mb-5">
            <div className="col-lg-6 scroll-reveal from-left">
                <h2 className="mb-4">{isAr ? 'كل ما تود معرفته عن خدماتنا' : 'Everything you need to know'}</h2>
                <p className="mb-4">
                    {isAr 
                        ? 'هل لديك استفسار؟ لقد قمنا بتجميع أكثر الأسئلة شيوعاً لمساعدتك في فهم كيف نعمل وكيف يمكننا مساعدتك في نمو أعمالك.' 
                        : 'Have a question? We\'ve compiled the most common questions to help you understand how we work and how we can help you grow your business.'}
                </p>
                <div className="d-flex align-items-center p-4 bg-light rounded shadow-sm border-start border-primary border-4">
                    <i className="fa fa-phone-alt fa-2x text-primary me-3 ms-3"></i>
                    <div>
                        <h6 className="mb-1">{isAr ? 'هل ما زلت بحاجة للمساعدة؟' : 'Still need help?'}</h6>
                        <p className="mb-0 small text-muted">{isAr ? 'تواصل معنا مباشرة عبر الهاتف أو الواتساب' : 'Contact us directly via phone or WhatsApp'}</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 scroll-reveal from-right">
                <div className="mx-auto" style={{ maxWidth: '400px' }}>
                    <DotLottieReact
                        src="https://lottie.host/9842d8cc-cc0c-4e56-bca3-3f44fea9efd8/fxmKctxAVj.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
        </div>

        <div className="row justify-content-center">
            <div className="col-lg-10 scroll-reveal from-bottom">
                <div className="accordion" id="faqPageAccordion">
                    {dataLoading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                        </div>
                    ) : faqs.length > 0 ? (
                        faqs.map((faq, index) => (
                            <div className="accordion-item mb-3 rounded border-0 shadow-sm overflow-hidden" key={faq.id || index}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className={`accordion-button ${index === 0 ? '' : 'collapsed'} fw-bold`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded={index === 0 ? "true" : "false"}
                                        aria-controls={`collapse${index}`}
                                        style={{ direction: isAr ? 'rtl' : 'ltr' }}
                                    >
                                        {isAr ? faq.question_ar : faq.question_en}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#faqPageAccordion"
                                >
                                    <div className="accordion-body bg-white" style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
                                        {isAr ? faq.answer_ar : faq.answer_en}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-5">
                            <p className="text-muted">{isAr ? 'لا يوجد أسئلة حالياً' : 'No FAQs found'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Faqs;
