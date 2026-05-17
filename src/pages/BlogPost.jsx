import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { useSpinner } from '../hooks/useAnimations'
import { useLanguage } from '../context/LanguageContext'
import { api, getImageUrl } from '../utils/api'

const BlogPost = () => {
  const loading = useSpinner()
  const { id } = useParams()
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchPostData = async () => {
      try {
        const allArticles = await api.get('/articles')
        const currentPost = allArticles.find(p => p.id.toString() === id || p.slug === id)
        if (currentPost) {
          setPost(currentPost)
          setRelatedPosts(allArticles.filter(p => p.id !== currentPost.id).slice(0, 3))
        }
      } catch (err) {
        console.error('Error fetching article:', err)
      } finally {
        setDataLoading(false)
      }
    }
    fetchPostData()
  }, [id])

  if (dataLoading) return null

  if (!post) {
    return (
      <div className="container-fluid p-0" style={{ background: '#F7FAFF' }}>
        <Spinner loading={loading} />
        <Navbar />
        <div className="container py-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <i className="fa fa-exclamation-circle fa-5x text-muted opacity-25"></i>
          <h2 className="text-dark mt-4">{isAr ? 'المقال غير موجود' : 'Article Not Found'}</h2>
          <Link to="/blog" className="btn btn-primary rounded-pill mt-4">
            {isAr ? 'العودة للمدونة' : 'Back to Blog'}
          </Link>
        </div>
        <Footer />
        <BackToTop />
      </div>
    )
  }

  return (
    <div className="container-fluid p-0" style={{ background: '#F7FAFF' }}>
      <Spinner loading={loading} />
      <Navbar />

      {/* Hero */}
      <div className="post-hero-ellipse position-relative overflow-hidden" style={{ minHeight: '55vh' }}>
        <div className="hero-bg-image position-absolute w-100 h-100" style={{
          backgroundImage: post.image && !post.image.startsWith('fa-') ? `url(${getImageUrl(post.image)})` : 'url(/img/services/blog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="ellipse-deco ellipse-1"></div>
        <div className="ellipse-deco ellipse-4"></div>

        <div className="container position-relative h-100 d-flex align-items-center" style={{ zIndex: 2, paddingTop: '100px', paddingBottom: '50px' }}>
          <div className="row align-items-center w-100">
            <div className="col-lg-8">
              <Link to="/blog" className="text-white text-decoration-none d-inline-flex align-items-center gap-2 mb-4 fw-semibold opacity-75 hover-opacity-100" style={{ transition: 'opacity 0.3s' }}>
                <i className={`fa fa-arrow-${isAr ? 'right' : 'left'}`}></i>
                {isAr ? 'العودة للمقالات' : 'Back to Articles'}
              </Link>
              <span className="d-inline-block badge bg-white text-primary rounded-pill px-4 py-2 mb-4 fw-semibold">
                {isAr ? post.category_ar || 'عام' : post.category_en || 'General'}
              </span>
              <h1 className="display-3 fw-bold text-white mb-4" style={{ lineHeight: '1.2' }}>
                {isAr ? post.title_ar : post.title_en}
              </h1>
              <div className="d-flex align-items-center gap-4 text-white opacity-80">
                <span><i className="fa fa-calendar me-2"></i>{new Date(post.created_at).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}</span>
              </div>
            </div>
            <div className="col-lg-4 text-center d-none d-lg-block">
              <div className="ellipse-icon-container d-inline-flex align-items-center justify-content-center" style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.4)'
              }}>
                {post.image && post.image.startsWith('fa-') ? (
                  <i className={`fa ${post.image} fa-4x text-white`}></i>
                ) : post.image ? (
                  <img src={getImageUrl(post.image)} alt="" style={{ maxWidth: '80%', maxHeight: '80%' }} />
                ) : (
                  <i className="fa fa-newspaper-o fa-4x text-white"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Content */}
      <div className="post-content-ellipse py-5" style={{ background: '#F7FAFF' }}>
        <div className="container px-lg-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="post-body-ellipse bg-white rounded-4 p-4 p-md-5 shadow-sm mb-5">
                <p className="lead text-dark mb-4" style={{ lineHeight: '1.9' }}>
                  {isAr ? post.excerpt_ar : post.excerpt_en}
                </p>

                <div
                  className="post-content-rich text-muted"
                  style={{ lineHeight: '1.9', fontSize: '1.1rem' }}
                  dangerouslySetInnerHTML={{ __html: isAr ? post.content_ar : post.content_en }}
                />

                {/* Share */}
                <div className="post-share-ellipse mt-5 pt-4" style={{ borderTop: '2px solid #f0f0f0' }}>
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-muted">{isAr ? 'مشاركة:' : 'Share:'}</span>
                      <div className="d-flex gap-2">
                        {[
                          { id: 'facebook', icon: 'fab fa-facebook-f', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
                          { id: 'twitter', icon: 'fab fa-twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(isAr ? post.title_ar : post.title_en)}` },
                          { id: 'linkedin', icon: 'fab fa-linkedin-in', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
                          { id: 'whatsapp', icon: 'fab fa-whatsapp', url: `https://wa.me/?text=${encodeURIComponent((isAr ? post.title_ar : post.title_en) + ' ' + window.location.href)}` }
                        ].map((social, i) => (
                          <button
                            key={i}
                            className="btn btn-sm rounded-circle"
                            style={{
                              width: '42px',
                              height: '42px',
                              background: '#F7FAFF',
                              color: '#2124B1',
                              border: '1px solid #e2e8f0',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem'
                            }}
                            onClick={() => window.open(social.url, '_blank')}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#2124B1';
                              e.currentTarget.style.color = '#FFFFFF';
                              e.currentTarget.style.borderColor = '#2124B1';
                              e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
                              e.currentTarget.style.boxShadow = '0 8px 15px rgba(33, 36, 177, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#F7FAFF';
                              e.currentTarget.style.color = '#2124B1';
                              e.currentTarget.style.borderColor = '#e2e8f0';
                              e.currentTarget.style.transform = 'none';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <i className={social.icon}></i>
                          </button>
                        ))}
                      </div>
                    </div>
                    <Link to="/blog" className="btn rounded-pill px-4 text-white" style={{ background: post.color || 'linear-gradient(135deg, #2124B1 0%, #4777F5 100%)' }}>
                      <i className="fa fa-list me-2"></i>
                      {isAr ? 'كل المقالات' : 'All Articles'}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="related-posts-ellipse mt-5 pt-5" style={{ borderTop: '1px solid #e0e0e0' }}>
                  <h4 className="text-dark fw-bold mb-4">
                    <i className="fa fa-link text-primary me-2"></i>
                    {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                  </h4>
                  <div className="row g-4">
                    {relatedPosts.map((related) => (
                      <div className="col-md-4" key={related.id}>
                        <Link to={`/blog/${related.slug || related.id}`} className="text-decoration-none">
                          <div className="ellipse-related-card bg-white rounded-4 overflow-hidden h-100 shadow-sm">
                            <div className="p-4 text-center" style={{ background: related.color || 'linear-gradient(135deg, #2124B1 0%, #4777F5 100%)', borderRadius: '16px 16px 0 0' }}>
                              {related.image && related.image.startsWith('fa-') ? (
                                <i className={`fa ${related.image} fa-2x text-white mb-3 d-block`}></i>
                              ) : (
                                <i className="fa fa-newspaper-o fa-2x text-white mb-3 d-block"></i>
                              )}
                              <h6 className="text-white mb-2 fw-semibold small">{isAr ? related.title_ar : related.title_en}</h6>
                              <small className="text-white opacity-80">{new Date(related.created_at).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}</small>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  )
}

export default BlogPost