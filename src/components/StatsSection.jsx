import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Counter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={countRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const stats = [
    {
      id: 1,
      end: 12,
      prefix: '+',
      labelAr: 'سنة خبرة متراكمة',
      labelEn: 'Years of Experience',
    },
    {
      id: 2,
      end: 120,
      prefix: '+',
      labelAr: 'مشروع ذكاء اصطناعي منجز',
      labelEn: 'AI Projects Completed',
    },
    {
      id: 3,
      end: 40,
      suffix: '%',
      labelAr: 'توفير في التكاليف التشغيلية',
      labelEn: 'Operational Cost Savings',
    },
    {
      id: 4,
      end: 97,
      suffix: '%',
      labelAr: 'نسبة رضا العملاء',
      labelEn: 'Customer Satisfaction',
    },
  ];

  return (
    <div className="container py-5">
      <div className="container px-lg-5">
        <div className="row g-4 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className={`col-md-6 col-lg-3 scroll-reveal ${stat.id % 2 === 0 ? 'from-right' : 'from-left'}`} data-delay={(stat.id - 1) * 150}>
              <div className="stat-circle d-flex flex-column align-items-center justify-content-center mx-auto">
                <h2 className="display-4 text-primary mb-0">
                  <Counter end={stat.end} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                </h2>
                <p className="text-dark fw-bold mb-0 mt-2">
                  {isAr ? stat.labelAr : stat.labelEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
