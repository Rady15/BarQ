import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const VisionMissionSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const data = [
    {
      title: isAr ? 'رؤيتنا' : 'Our Vision',
      desc: isAr ? 'أن نكون الشريك التقني الأول والموثوق في قيادة التحول الرقمي الذكي في المملكة العربية السعودية والمنطقة.' : 'To be the primary and trusted technical partner in leading smart digital transformation in the Kingdom of Saudi Arabia and the region.',
      icon: 'fa fa-eye'
    },
    {
      title: isAr ? 'رسالتنا' : 'Our Mission',
      desc: isAr ? 'تمكين المؤسسات من تحقيق أقصى إمكاناتها من خلال ابتكار حلول برمجية وأتمتة ذكية تسهل العمليات وترفع الكفاءة.' : 'Empowering organizations to reach their maximum potential by innovating smart software and automation solutions that facilitate operations and increase efficiency.',
      icon: 'fa fa-bullseye'
    },
    {
      title: isAr ? 'قيمنا' : 'Our Values',
      desc: isAr ? 'الابتكار المستمر، الشفافية المطلقة، الدقة في التنفيذ، والالتزام بتمكين الكوادر الوطنية بما يخدم رؤية 2030.' : 'Continuous innovation, absolute transparency, precision in execution, and commitment to empowering national cadres in service of Vision 2030.',
      icon: 'fa fa-handshake'
    }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="row g-4">
          {data.map((item, index) => (
            <div className={`col-lg-4 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 150} key={index}>
              <div className="bg-light rounded text-center p-5 h-100 shadow-sm hover-top transition">
                <div className="btn-square bg-primary rounded-circle mx-auto mb-4" style={{ width: '64px', height: '64px' }}>
                  <i className={`${item.icon} text-white fa-2x`}></i>
                </div>
                <h4 className="mb-3">{item.title}</h4>
                <p className="mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisionMissionSection;
