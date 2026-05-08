import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../utils/api';

const AdminAnalytics = () => {
  const [gaId, setGaId] = useState('');
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    if (gaId.startsWith('G-') || gaId.startsWith('UA-')) {
      setConnected(true);
    } else {
      alert('يرجى إدخال معرف Google Analytics صحيح (يبدأ بـ G- أو UA-)');
    }
  };

  const [mockData, setMockData] = useState({
    visitors: { today: 0, week: 0, month: 0 },
    pageViews: { today: 0, week: 0, month: 0 },
    bounceRate: '0%',
    avgSession: '0:00',
    topPages: [],
    sources: [
      { source: 'بحث Google', percentage: 45, color: '#4285f4' },
      { source: 'مباشر', percentage: 25, color: '#34a853' },
      { source: 'وسائل التواصل', percentage: 18, color: '#ea4335' },
      { source: 'إحالات', percentage: 12, color: '#fbbc05' },
    ],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await api.get('/analytics/summary');
        setMockData(prev => ({
          ...prev,
          visitors: data.visitors,
          pageViews: data.visitors, // Simple mock for now
          topPages: data.topPages.map(p => ({ page: p.page_path, views: p.views, path: p.page_path }))
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <AdminLayout pageTitle="الإحصائيات والتحليلات">
      {/* GA Connection */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fab fa-google me-2"></i>ربط Google Analytics</h5>
          {connected && <span className="admin-badge published">متصل</span>}
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.85rem' }}>Google Analytics Measurement ID</label>
              <input
                style={{ width: '100%', padding: '10px 14px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem' }}
                value={gaId}
                onChange={e => setGaId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                dir="ltr"
              />
            </div>
            <button className={`btn-admin ${connected ? 'success' : 'primary'}`} onClick={handleConnect} style={{ height: '44px' }}>
              <i className={`fa ${connected ? 'fa-check' : 'fa-link'} me-1`}></i>
              {connected ? 'متصل بنجاح' : 'ربط الآن'}
            </button>
          </div>
          {connected && (
            <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#10b981' }}>
              <i className="fa fa-check-circle me-1"></i>
              تم ربط Google Analytics بنجاح. البيانات يتم تحديثها تلقائياً.
            </p>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="row g-4 mb-4">
        {[
          { label: 'زوار اليوم', value: mockData.visitors.today, icon: 'fa-users', color: 'primary' },
          { label: 'مشاهدات اليوم', value: mockData.pageViews.today, icon: 'fa-eye', color: 'success' },
          { label: 'معدل الارتداد', value: mockData.bounceRate, icon: 'fa-sign-out-alt', color: 'warning' },
          { label: 'متوسط الجلسة', value: mockData.avgSession, icon: 'fa-clock', color: 'danger' },
        ].map((stat, i) => (
          <div className="col-sm-6 col-xl-3" key={i}>
            <div className="admin-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className={`stat-icon ${stat.color}`}><i className={`fa ${stat.icon}`}></i></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Top Pages */}
        <div className="col-lg-7">
          <div className="admin-table-card">
            <div className="card-header">
              <h5><i className="fa fa-chart-bar me-2"></i>أكثر الصفحات زيارة</h5>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>الصفحة</th>
                  <th>المسار</th>
                  <th>المشاهدات</th>
                </tr>
              </thead>
              <tbody>
                {mockData.topPages.map((page, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{page.page}</td>
                    <td dir="ltr" style={{ fontSize: '0.85rem', color: '#6b7280' }}>{page.path}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${(page.views / 1250) * 100}%`, height: '100%', background: '#082e71', borderRadius: '3px' }}></div>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{page.views.toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="col-lg-5">
          <div className="admin-table-card" style={{ height: '100%' }}>
            <div className="card-header">
              <h5><i className="fa fa-share-alt me-2"></i>مصادر الزيارات</h5>
            </div>
            <div style={{ padding: '24px' }}>
              {mockData.sources.map((source, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{source.source}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: source.color }}>{source.percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#f3f4f6', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${source.percentage}%`,
                      height: '100%',
                      background: source.color,
                      borderRadius: '5px',
                      transition: 'width 1s ease'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
