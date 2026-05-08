import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const SEO = () => {
  const location = useLocation();
  const { lang } = useLanguage();
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const path = location.pathname;
        const data = await api.get(`/seo${path === '/' ? '' : path}`);
        if (data && data.title) {
          setSeoData(data);
        } else {
          setSeoData(null);
        }
      } catch (err) {
        console.error('SEO Fetch Error:', err);
        setSeoData(null);
      }
    };
    fetchSeo();
  }, [location.pathname]);

  if (!seoData) return (
    <Helmet>
      <title>{lang === 'ar' ? 'برق تك | حلول تقنية ذكية' : 'Barq Tech | Smart Tech Solutions'}</title>
    </Helmet>
  );

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      {seoData.og_image && <meta property="og:image" content={seoData.og_image} />}
      {seoData.canonical_url && <link rel="canonical" href={seoData.canonical_url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
    </Helmet>
  );
};

export default SEO;
