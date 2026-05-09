import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api, getImageUrl } from '../utils/api';

const TeamSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await api.get('/team');
        setTeam(data);
      } catch (err) {
        console.error('Error fetching team data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading || team.length === 0) return null;

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
          {team.map((member, index) => (
            <div className={`col-lg-3 col-md-6 scroll-reveal ${index % 2 === 0 ? 'from-left' : 'from-right'}`} data-delay={index * 150} key={member.id || index}>
              <div className="team-item bg-light rounded text-center p-4 h-100 shadow-sm">
                <div className="btn-square bg-white rounded-circle mx-auto mb-4 border overflow-hidden" style={{ width: '100px', height: '100px' }}>
                  {member.image ? (
                    <img src={getImageUrl(member.image)} alt={isAr ? member.name_ar : member.name_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <i className="fa fa-user text-primary fa-3x" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}></i>
                  )}
                </div>
                <h5 className="mb-1">{isAr ? member.name_ar : member.name_en}</h5>
                <small>{isAr ? member.role_ar : member.role_en}</small>
                {/* Optional Bio section if we wanted to show it
                {(member.bio_ar || member.bio_en) && (
                  <p className="mt-2 text-muted" style={{ fontSize: '0.85rem' }}>
                    {isAr ? member.bio_ar : member.bio_en}
                  </p>
                )}
                */}
                <div className="d-flex justify-content-center mt-3">
                  {member.linkedin && (
                    <a className="btn btn-square btn-primary rounded-circle mx-1" href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                  {member.twitter && (
                    <a className="btn btn-square btn-primary rounded-circle mx-1" href={member.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {member.email && (
                    <a className="btn btn-square btn-primary rounded-circle mx-1" href={`mailto:${member.email}`}>
                      <i className="fa fa-envelope"></i>
                    </a>
                  )}
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
