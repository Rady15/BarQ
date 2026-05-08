import React, { useEffect } from 'react';
import { useSite } from '../context/SiteContext';

const GoogleAnalytics = () => {
  const { settings } = useSite();
  const gaId = settings.ga_measurement_id;

  useEffect(() => {
    if (!gaId) return;

    // Load GA Script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        'cookie_domain': 'auto',
        'cookie_flags': 'SameSite=None;Secure'
      });
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [gaId]);

  return null;
};

export default GoogleAnalytics;
