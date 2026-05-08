import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const Privacy = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-fluid bg-white p-0">
      <Navbar />
      <PageHeader 
        title={isAr ? 'سياسة الخصوصية والكوكيز' : 'Privacy & Cookies Policy'} 
        breadcrumb={isAr ? 'الخصوصية' : 'Privacy'}
      />
      
      <div className="container py-5 px-lg-5">
        <div className="row">
          <div className="col-12 scroll-reveal from-bottom">
            <div className="bg-light p-4 p-md-5 rounded shadow-sm">
              <h3 className="text-primary mb-4 border-bottom pb-3">{isAr ? 'سياسة الخصوصية والكوكيز' : 'Privacy & Cookies Policy'}</h3>
              
              <div className="policy-section mb-5">
                <h5 className="text-dark fw-bold mb-3">{isAr ? '1. مقدمة' : '1. Introduction'}</h5>
                <p>
                  {isAr 
                    ? 'في برق تك، نعتبر خصوصية زوارنا ومستخدمينا أولوية قصوى. تهدف هذه السياسة إلى توضيح كيفية تعاملنا مع البيانات الشخصية التي يتم جمعها عبر موقعنا الإلكتروني، بما يتماشى مع الأنظمة المحلية والمعايير الدولية لحماية البيانات.' 
                    : 'At Barq Tech, we consider the privacy of our visitors and users a top priority. This policy aims to clarify how we handle personal data collected through our website, in line with local regulations and international data protection standards.'}
                </p>
              </div>

              <div className="policy-section mb-5">
                <h5 className="text-dark fw-bold mb-3">{isAr ? '2. المعلومات التي نجمعها' : '2. Information We Collect'}</h5>
                <p>{isAr ? 'نقوم بجمع الأنواع التالية من المعلومات:' : 'We collect the following types of information:'}</p>
                <ul>
                  <li>{isAr ? 'معلومات الهوية: مثل الاسم الكامل.' : 'Identity Info: such as full name.'}</li>
                  <li>{isAr ? 'معلومات التواصل: البريد الإلكتروني ورقم الهاتف.' : 'Contact Info: Email and phone number.'}</li>
                  <li>{isAr ? 'بيانات الاستخدام: معلومات حول كيفية تفاعلك مع موقعنا (الصفحات التي تمت زيارتها، وقت التصفح).' : 'Usage Data: Info on how you interact with our site (pages visited, time spent).'}</li>
                  <li>{isAr ? 'الموقع الجغرافي التقريبي: المدينة والدولة لتخصيص الخدمة.' : 'Approximate Location: City and country to customize the service.'}</li>
                </ul>
              </div>

              <div className="policy-section mb-5">
                <h5 className="text-dark fw-bold mb-3">{isAr ? '3. استخدام ملفات تعريف الارتباط (Cookies)' : '3. Use of Cookies'}</h5>
                <p>
                  {isAr 
                    ? 'نستخدم الكوكيز لتحسين تجربتك الرقمية. تساعدنا هذه الملفات الصغيرة في تذكر تفضيلاتك، وتأمين حسابك، وفهم الأقسام الأكثر أهمية بالنسبة لك. يمكنك دائماً تعطيل الكوكيز من إعدادات متصفحك، ولكن قد يؤثر ذلك على بعض وظائف الموقع.' 
                    : 'We use cookies to enhance your digital experience. These small files help us remember your preferences, secure your account, and understand which sections are most important to you. You can always disable cookies in your browser settings, but this may affect some site functionalities.'}
                </p>
              </div>

              <div className="policy-section mb-5">
                <h5 className="text-dark fw-bold mb-3">{isAr ? '4. حماية البيانات وأمانها' : '4. Data Protection & Security'}</h5>
                <p>
                  {isAr 
                    ? 'نحن نطبق بروتوكولات أمان متقدمة (SSL Encryption) لضمان حماية بياناتك من الوصول غير المصرح به. لا يتم تخزين معلوماتك الحساسة إلا لغرض تقديم الخدمة المطلوبة منا.' 
                    : 'We implement advanced security protocols (SSL Encryption) to ensure your data is protected from unauthorized access. Your sensitive information is only stored for the purpose of providing the service requested from us.'}
                </p>
              </div>

              <div className="policy-section mb-5">
                <h5 className="text-dark fw-bold mb-3">{isAr ? '5. الإفصاح لأطراف ثالثة' : '5. Third-Party Disclosure'}</h5>
                <p>
                  {isAr 
                    ? 'نحن لا نبيع أو نتاجر ببياناتك الشخصية مع أي أطراف خارجية. قد نشارك بعض البيانات المجهولة مع أدوات التحليل (مثل Google Analytics) فقط لتحسين أداء الموقع.' 
                    : 'We do not sell or trade your personal data with any outside parties. We may share some anonymous data with analytics tools (like Google Analytics) only to improve site performance.'}
                </p>
              </div>

              <div className="mt-5 p-4 bg-white rounded border-start border-primary border-4 shadow-sm">
                <h6 className="text-primary mb-2">{isAr ? 'تحديثات السياسة' : 'Policy Updates'}</h6>
                <p className="mb-0 small">
                  {isAr 
                    ? 'قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس التغييرات في ممارساتنا. آخر تحديث: مايو 2026.' 
                    : 'We may update this policy from time to time to reflect changes in our practices. Last updated: May 2026.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
