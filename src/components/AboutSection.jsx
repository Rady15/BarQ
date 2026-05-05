import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AboutSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5" id="about">
      <div className="container px-lg-5">
        <div className="row g-5">
          <div className="col-lg-6 scroll-reveal from-left" data-delay="100">
            <div className="section-title position-relative mb-4 pb-2">
              <h6 className="position-relative text-primary ps-4">
                {isAr ? 'من نحن' : 'About Us'}
              </h6>
              <h2 className="mt-2">
                {isAr ? 'برق تك.. barq tech' : 'Barq Tech.. barq tech'}
              </h2>
            </div>
            <p className="mb-4">
              {isAr ? (
                <>
                  نحن في برق تك، شركة تقنية سعودية المنشأ، نؤمن أن الذكاء الاصطناعي ليس مجرد أداة، بل هو المحرك الجديد للنمو. انطلقنا لنطوع أحدث تقنيات الـ AI لخدمة الشركات الطموحة، محولين الأفكار المعقدة إلى تطبيقات واقعية ووكلاء ذكيين يعملون بدقة البرق.
                  <br /><br />
                  بصفتنا شركاء معتمدين لعمالقة التقنية مثل Microsoft، Oracle، وOdoo، نضمن لك حلولاً برمجية تتوافق مع أعلى المعايير العالمية وبلمسة إبداعية محلية.
                  <br /><br />
                  <strong>الرؤية والأهداف:</strong>
                  <br />
                  التزاماً منا بدعم رؤية المملكة 2030، نضع نصب أعيننا تسخير نقاط القوة الفريدة لوطننا لتلبية المتطلبات التقنية المحلية بكفاءة عالية. ومن خلال حصيلة خبراتنا العميقة وتخصصنا الدقيق، نقود الابتكارات الرقمية ونقدم خدمات ذكية مدعومة تكنولوجياً لتمكين عملائنا من تحقيق التفوق والريادة.
                </>
              ) : (
                <>
                  We at Barq Tech, a Saudi-born technology company, believe that artificial intelligence is not just a tool, but the new engine for growth. We set out to harness the latest AI technologies to serve ambitious companies, transforming complex ideas into realistic applications and smart agents that work with lightning precision.
                  <br /><br />
                  As certified partners with technology giants such as Microsoft, Oracle, and Odoo, we guarantee software solutions that comply with the highest international standards with a local creative touch.
                  <br /><br />
                  <strong>Vision and Goals:</strong>
                  <br />
                  In commitment to supporting the Kingdom's Vision 2030, we aim to harness the unique strengths of our homeland to meet local technical requirements with high efficiency. Through our deep expertise and precise specialization, we lead digital innovations and provide technologically-supported smart services to enable our clients to achieve excellence and leadership.
                </>
              )}
            </p>
            <div className="row g-3">
              <div className="col-sm-6">
                <h6 className="mb-3">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'تطبيقات واقعية' : 'Realistic Applications'}
                </h6>
                <h6 className="mb-0">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'وكلاء ذكيون' : 'Smart Agents'}
                </h6>
              </div>
              <div className="col-sm-6">
                <h6 className="mb-3">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'دقة البرق' : 'Lightning Precision'}
                </h6>
                <h6 className="mb-0">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? 'ابتكارات رقمية' : 'Digital Innovations'}
                </h6>
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <Link className={`btn btn-primary rounded-pill px-4 ${isAr ? 'ms-3' : 'me-3'}`} to="/about">
                {isAr ? 'اقرأ المزيد' : 'Read More'}
              </Link>
              <a className="btn btn-outline-primary btn-square me-3" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-primary btn-square me-3" href="#"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-primary btn-square me-3" href="#"><i className="fab fa-instagram"></i></a>
              <a className="btn btn-outline-primary btn-square" href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-lg-6 scroll-reveal from-right text-center" data-delay="300">
            <img
              className="img-fluid rounded shadow-sm"
              src="/img/about.png"
              alt="About Bark Tech"
              style={{ maxWidth: '600px', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default AboutSection;
