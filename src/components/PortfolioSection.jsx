import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { api, getImageUrl } from '../utils/api';

const PortfolioSection = ({ limit }) => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.get('/projects');
        // If it's a list with status, we could filter here or use API query
        setProjects(data.filter(p => p.status === 'published' || p.status === 'active' || !p.status));
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  const displayData = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="container-xxl py-5" id="portfolio">
      <div className="container px-lg-5">
        <div
          className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom"
        >
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'مشاريعنا' : 'Our Projects'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'أحدث المشاريع التي أطلقناها' : 'Recently Launched Projects'}
          </h2>
        </div>
        <div className="row g-4">
          {displayData.map((item, index) => (
            <div
              className={`col-lg-4 col-md-6 portfolio-item scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`}
              key={item.id || index}
              data-delay={index * 100}
            >
              <div className="position-relative rounded overflow-hidden">
                <img className="img-fluid w-100" src={getImageUrl(item.image)} alt={isAr ? item.title_ar : item.title_en} />
                <div className="portfolio-overlay">
                  <div className="d-flex gap-2 mb-3">
                    <Link className="btn btn-light" to={`/project/${item.id}`}>
                      <i className="fa fa-link text-primary" style={{ fontSize: '1.2rem', padding: '5px' }}></i>
                    </Link>
                    <a className="btn btn-light" href={getImageUrl(item.image)} target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-search text-primary" style={{ fontSize: '1.2rem', padding: '5px' }}></i>
                    </a>
                  </div>
                  <div className="mt-auto px-4 py-3 bg-dark-50 text-center w-100">
                    <small className="text-white d-block mb-1">
                      <i className="fa fa-folder me-2 ms-2"></i>
                      {item.category || (isAr ? 'مشروع تقني' : 'Tech Project')}
                    </small>
                    <h5 className="text-white mb-2">
                      <Link to={`/project/${item.id}`} className="text-white text-decoration-none hover-cyan">
                        {isAr ? item.title_ar : item.title_en}
                      </Link>
                    </h5>
                    <p className="text-white-50 small mb-2">{isAr ? item.description_ar : item.description_en}</p>
                    <Link to={`/project/${item.id}`} className="btn btn-sm btn-outline-cyan rounded-pill px-3 py-1 mt-1 text-white fw-bold">
                      {isAr ? 'تفاصيل المشروع ➔' : 'Project Details ➔'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {limit && (
          <div className="text-center mt-5 scroll-reveal from-bottom" data-delay="300">
            <Link to="/project" className="btn btn-primary rounded-pill py-3 px-5">
              {isAr ? 'عرض المزيد من المشاريع' : 'View More Projects'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioSection;
