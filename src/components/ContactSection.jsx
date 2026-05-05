import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ContactSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isAr ? 'شكراً لرسالتك! سنتواصل معك قريباً.' : 'Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container-xxl py-5" id="contact">
      <div className="container px-lg-5">
        <div className="row g-5">
          <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="section-title position-relative mb-4 pb-2">
              <h6 className="position-relative text-primary ps-4">
                {isAr ? 'تواصل معنا الآن' : 'Contact Us Now'}
              </h6>
              <h2 className="mt-2">
                {isAr ? 'جاهز تسبق منافسيك بخطوة؟' : 'Ready to stay a step ahead of competitors?'}
              </h2>
            </div>
            <p className="mb-4">
              {isAr ? 'هل أنت مستعد لبدء رحلة التحول الرقمي مع "برق تك"؟ تواصل معنا اليوم لتحصل على حلول موجهة بالكامل نحو تحقيق أهدافك!' : 'Ready to start your digital transformation journey with "Barq Tech"? Contact us today to get solutions fully directed towards achieving your goals!'}
            </p>
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                <i className="fa fa-phone-alt text-white"></i>
              </div>
              <div className={isAr ? 'ms-3' : 'me-3'}></div>
              <div className="px-3">
                <h5 className="mb-0">{isAr ? 'اتصال مباشر' : 'Direct Call'}</h5>
                <p className="mb-0" style={{ direction: 'ltr' }}>+966 55 123 4567</p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-success" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                <i className="fab fa-whatsapp text-white"></i>
              </div>
              <div className={isAr ? 'ms-3' : 'me-3'}></div>
              <div className="px-3">
                <h5 className="mb-0">{isAr ? 'واتساب' : 'WhatsApp'}</h5>
                <a href="https://wa.me/966551234567" target="_blank" rel="noopener noreferrer" className="mb-0 text-dark">
                  {isAr ? 'اضغط للمحادثة الفورية' : 'Click for instant chat'}
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                <i className="fa fa-envelope-open text-white"></i>
              </div>
              <div className={isAr ? 'ms-3' : 'me-3'}></div>
              <div className="px-3">
                <h5 className="mb-0">{isAr ? 'ايميل' : 'Email'}</h5>
                <p className="mb-0" style={{ direction: 'ltr' }}>grow@barqtech.ai</p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-3">
              <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                <i className="fa fa-map-marker-alt text-white"></i>
              </div>
              <div className={isAr ? 'ms-3' : 'me-3'}></div>
              <div className="px-3">
                <h5 className="mb-0">{isAr ? 'المقر الرئيسي (الرياض)' : 'Headquarters (Riyadh)'}</h5>
                <p className="mb-0 small">{isAr ? 'حي الملقا، طريق الملك فهد، برج الابتكار، الدور 12' : 'Al Malqa, King Fahd Rd, Innovation Tower, 12th Floor'}</p>
                <h5 className="mb-0 mt-2">{isAr ? 'فرع جدة' : 'Jeddah Branch'}</h5>
                <p className="mb-0 small">{isAr ? 'طريق الأمير سلطان، برج الأعمال' : 'Prince Sultan Rd, Business Tower'}</p>
              </div>
            </div>
            <div className="bg-primary-transparent p-3 rounded mt-4">
              <h6 className="mb-1 text-primary">{isAr ? 'ساعات العمل' : 'Working Hours'}</h6>
              <p className="mb-1 small">{isAr ? 'الأحد - الخميس | 9:00 ص - 6:00 م' : 'Sunday - Thursday | 9:00 AM - 6:00 PM'}</p>
              <p className="mb-0 small text-danger fw-bold">{isAr ? 'دعم طوارئ العملاء: ' : 'Customer Emergency Support: '}</p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="wow fadeInUp" data-wow-delay="0.3s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder={isAr ? 'اسمك' : 'Your Name'}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <label htmlFor="name" style={{ right: isAr ? '0' : 'auto', left: isAr ? 'auto' : '0' }}>{isAr ? 'اسمك' : 'Your Name'}</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder={isAr ? 'بريدك الإلكتروني' : 'Your Email'}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label htmlFor="email" style={{ right: isAr ? '0' : 'auto', left: isAr ? 'auto' : '0' }}>{isAr ? 'بريدك الإلكتروني' : 'Your Email'}</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder={isAr ? 'الموضوع' : 'Subject'}
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <label htmlFor="subject" style={{ right: isAr ? '0' : 'auto', left: isAr ? 'auto' : '0' }}>{isAr ? 'الموضوع' : 'Subject'}</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder={isAr ? 'اترك رسالتك هنا' : 'Leave a message here'}
                        id="message"
                        style={{ height: '150px' }}
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      <label htmlFor="message" style={{ right: isAr ? '0' : 'auto', left: isAr ? 'auto' : '0' }}>{isAr ? 'الرسالة' : 'Message'}</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      {isAr ? 'إرسال الرسالة' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
