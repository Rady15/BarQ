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
                {isAr ? 'ريادة في عالم الذكاء الاصطناعي وتقنية المعلومات' : 'Leadership in the World of AI and Information Technology'}
              </h2>
            </div>
            <p className="mb-4">
              {isAr ? (
                <>
                  نحن مؤسسة تقنية رائدة، متخصصة في تقديم حلول تصميمية وبرمجية مبتكرة، وأنظمة أتمتة ذكية تلبي احتياجات الأفراد، والشركات، والجهات الحكومية. نهدف إلى خلق تجربة مستخدم استثنائية ونظم إدارة متكاملة تعتمد على الذكاء الاصطناعي لمساعدة نشاطك التجاري على النمو وتحقيق أرباح مستدامة في العالم الرقمي.
                  <br /><br />
                  نلتزم في "برق تك" بمواكبة التطور التكنولوجي لدعم رؤية المملكة 2030 من خلال ابتكار حلول تقنية ذكية وأنظمة ERP متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA).
                </>
              ) : (
                <>
                  We are a leading technology institution specializing in providing innovative design and software solutions, and smart automation systems that meet the needs of individuals, companies, and government agencies. We aim to create an exceptional user experience and integrated management systems based on artificial intelligence to help your business grow and achieve sustainable profits in the digital world.
                  <br /><br />
                  At "Barq Tech", we are committed to keeping pace with technological development to support the Kingdom's Vision 2030 by innovating smart technical solutions and ERP systems compatible with the requirements of the Zakat, Tax and Customs Authority (ZATCA).
                </>
              )}
            </p>
            <div className="row g-3">
              <div className="col-sm-6">
                <h6 className="mb-3">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? '+12 سنة خبرة متراكمة' : '+12 Years of Experience'}
                </h6>
                <h6 className="mb-0">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? '+120 مشروع ذكاء اصطناعي منجز' : '+120 AI Projects Delivered'}
                </h6>
              </div>
              <div className="col-sm-6">
                <h6 className="mb-3">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? '40% توفير في التكاليف التشغيلية' : '40% Avg Operational Savings'}
                </h6>
                <h6 className="mb-0">
                  <i className={`fa fa-check text-primary ${isAr ? 'ms-2' : 'me-2'}`}></i>
                  {isAr ? '97% نسبة رضا العملاء' : '97% Customer Satisfaction'}
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
          <div className="col-lg-6 scroll-reveal from-right" data-delay="300">
            <img
              className="img-fluid"
              src="/img/about.png"
              alt="About Bark Tech"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
