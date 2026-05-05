import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const teamData = [
  {
    name: 'فريق علماء البيانات',
    nameEn: 'Data Scientists Team',
    role: 'خبراء الذكاء الاصطناعي',
    roleEn: 'AI Experts',
    icon: 'fa fa-brain'
  },
  {
    name: 'فريق تطوير البرمجيات',
    nameEn: 'Software Development Team',
    role: 'مطورون Full-Stack',
    roleEn: 'Full-Stack Developers',
    icon: 'fa fa-laptop-code'
  },
  {
    name: 'فريق تجربة المستخدم',
    nameEn: 'UX/UI Design Team',
    role: 'مصممو واجهات محترفون',
    roleEn: 'Professional UI Designers',
    icon: 'fa fa-palette'
  },
  {
    name: 'فريق الدعم الفني',
    nameEn: 'Technical Support Team',
    role: 'استجابة فورية ',
    roleEn: ' Instant Response',
    icon: 'fa fa-headset'
  }
];

const TeamSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'فريق العمل' : 'Our Team'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'خبراء يقودون رحلتك نحو التحول الرقمي' : 'Experts Leading Your Journey to Digital Transformation'}
          </h2>
        </div>
        <div className="row g-4">
          {teamData.map((member, index) => (
            <div className={`col-lg-3 col-md-6 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 150} key={index}>
              <div className="team-item bg-light rounded text-center p-4 h-100 shadow-sm">
                <div className="btn-square bg-white rounded-circle mx-auto mb-4 border" style={{ width: '100px', height: '100px' }}>
                  <i className={`${member.icon} text-primary fa-3x`}></i>
                </div>
                <h5 className="mb-1">{isAr ? member.name : member.nameEn}</h5>
                <small>{isAr ? member.role : member.roleEn}</small>
                <div className="d-flex justify-content-center mt-3">
                  <a className="btn btn-square btn-primary rounded-circle mx-1" href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a className="btn btn-square btn-primary rounded-circle mx-1" href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
