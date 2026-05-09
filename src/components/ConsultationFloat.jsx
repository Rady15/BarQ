import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ConsultationFloat = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <a href="#contact" className={`consultation-float ${isAr ? 'ar' : 'en'}`}>
      <div className="consultation-icon">
        <i className="fa fa-headset"></i>
      </div>
      <span className="consultation-text">
        {isAr ? 'اطلب استشارة' : 'Consultation'}
      </span>
    </a>
  );
};

export default ConsultationFloat;
