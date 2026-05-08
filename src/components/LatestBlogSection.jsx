import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api, getImageUrl } from '../utils/api';

const LatestBlogSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await api.get('/articles?limit=3&status=published');
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading || articles.length === 0) return null;

  return (
    <div className="container-xxl py-5" id="blog">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'المدونة' : 'Our Blog'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'آخر المقالات التقنية' : 'Latest Tech Articles'}
          </h2>
        </div>
        <div className="row g-4">
          {articles.map((article, index) => (
            <div className="col-lg-4 col-md-6 scroll-reveal from-bottom" data-delay={index * 100} key={article.id}>
              <div className="blog-card-premium h-100 d-flex flex-column">
                <div className="card-image-premium overflow-hidden position-relative">
                  <img 
                    className="img-fluid w-100 h-100 blog-img-premium" 
                    src={getImageUrl(article.image)} 
                    alt={isAr ? article.title_ar : article.title_en} 
                  />
                  <div className="card-category-premium">
                    {isAr ? article.category : article.category_en || article.category}
                  </div>
                  <div className="card-overlay-premium">
                    <Link to={`/blog/${article.slug || article.id}`} className="btn btn-light rounded-pill px-4">
                      {isAr ? 'اقرأ الآن' : 'Read Now'}
                    </Link>
                  </div>
                </div>
                <div className="card-body-premium p-4 flex-grow-1 d-flex flex-column">
                  <div className="d-flex mb-3 small text-muted align-items-center">
                    <i className={`fa fa-calendar ${isAr ? 'ms-2' : 'me-2'} text-primary`}></i>
                    {new Date(article.published_at || article.created_at).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}
                    <span className="mx-2">|</span>
                    <i className={`fa fa-user ${isAr ? 'ms-2' : 'me-2'} text-primary`}></i>
                    {isAr ? 'برق تك' : 'Barq Tech'}
                  </div>
                  <h5 className="card-title-premium mb-3">{isAr ? article.title_ar : article.title_en}</h5>
                  <p className="card-text-premium text-muted flex-grow-1 mb-4">
                    {isAr ? article.excerpt_ar : article.excerpt_en}
                  </p>
                  <Link className="read-more-premium mt-auto" to={`/blog/${article.slug || article.id}`}>
                    {isAr ? 'أكمل القراءة' : 'Read More'} 
                    <i className={`fa fa-chevron-${isAr ? 'left' : 'right'} ${isAr ? 'me-2' : 'ms-2'}`}></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
           <Link to="/blog" className="btn btn-primary rounded-pill py-3 px-5 scroll-reveal from-bottom">
             {isAr ? 'عرض كافة المقالات' : 'View All Articles'}
           </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogSection;
