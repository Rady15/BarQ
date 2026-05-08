import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../utils/api';

const AdminDashboard = () => {
  const [data, setData] = useState({
    services: 0,
    clients: 0,
    articles: 0,
    projects: 0,
    todayVisits: 0,
    unreadMessages: 0
  });
  const [analytics, setAnalytics] = useState({
    visitors: { today: 0, week: 0, month: 0 },
    topPages: [],
    topCountries: [],
    devices: [],
    browsers: []
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [res, logs, stats] = await Promise.all([
          api.get('/dashboard'),
          api.get('/audit-logs'),
          api.get('/analytics/summary')
        ]);
        setData(res);
        setActivities(logs.slice(0, 8));
        setAnalytics(stats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { label: 'زيارات اليوم', value: data.todayVisits || 0, icon: 'fa-eye', color: 'info' },
    { label: 'رسائل جديدة', value: data.unreadMessages, icon: 'fa-envelope', color: 'success' },
    { label: 'الخدمات', value: data.services, icon: 'fa-cogs', color: 'primary' },
    { label: 'المشاريع', value: data.projects, icon: 'fa-project-diagram', color: 'warning' },
  ];

  const getLogIcon = (action) => {
    if (action.includes('CREATE')) return { icon: 'fa-plus', color: '#10b981' };
    if (action.includes('UPDATE')) return { icon: 'fa-edit', color: '#3b82f6' };
    if (action.includes('DELETE')) return { icon: 'fa-trash', color: '#ef4444' };
    return { icon: 'fa-info-circle', color: '#8b5cf6' };
  };

  return (
    <AdminLayout pageTitle="لوحة التحكم الرئيسية">
      {/* Stats Grid */}
      <div className="row g-4 mb-4">
        {stats.map((stat, i) => (
          <div className="col-sm-6 col-xl-3" key={i}>
            <div className="admin-stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
                <div className={`stat-icon ${stat.color}`}>
                  <i className={`fa ${stat.icon}`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Recent Activity */}
        <div className="col-lg-7">
          <div className="admin-table-card">
            <div className="card-header">
              <h5><i className="fa fa-clock me-2"></i>النشاط الأخير</h5>
            </div>
            <div style={{ padding: '16px 12px', overflowX: 'auto' }}>
              <div>
                {activities.length > 0 ? activities.map((log, i) => {
                  const style = getLogIcon(log.action);
                  return (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 0',
                      borderBottom: i < activities.length - 1 ? '1px solid #f3f4f6' : 'none'
                    }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: `${style.color}15`, color: style.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <i className={`fa ${style.icon}`}></i>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1f2937' }}>
                          {log.action.replace('_', ' ')}: {log.entity_type}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                          بواسطة {log.user_name || 'النظام'} • {new Date(log.timestamp).toLocaleString('ar-EG')}
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-5 text-muted">لا يوجد نشاط مسجل حالياً</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Breakdown */}
        <div className="col-lg-5">
          <div className="admin-table-card">
            <div className="card-header">
              <h5><i className="fa fa-chart-pie me-2"></i>توزيع الزوار</h5>
            </div>
            <div style={{ padding: '24px' }}>
              <h6 className="mb-3" style={{ fontSize: '0.85rem', color: '#6b7280' }}>الأجهزة المستخدمة</h6>
              {analytics.devices.map((d, i) => (
                <div key={i} className="mb-3">
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.85rem' }}>
                    <span>{d.device === 'Mobile' ? 'جوال' : d.device === 'Tablet' ? 'تابلت' : 'كمبيوتر'}</span>
                    <span className="fw-bold">{Math.round((d.count / (analytics.visitors.today || 1)) * 100) || 0}%</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-primary" style={{ width: `${(d.count / (analytics.visitors.today || 1)) * 100}%` }}></div>
                  </div>
                </div>
              ))}

              <hr className="my-4" />

              <h6 className="mb-3" style={{ fontSize: '0.85rem', color: '#6b7280' }}>أكثر الصفحات زيارة</h6>
              <div className="table-responsive">
                <table className="table table-sm table-borderless mb-0" style={{ fontSize: '0.8rem' }}>
                  <thead>
                    <tr className="text-muted">
                      <th>الصفحة</th>
                      <th className="text-end">المشاهدات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.topPages.map((p, i) => (
                      <tr key={i}>
                        <td className="text-truncate" style={{ maxWidth: '150px' }}>{p.page_path}</td>
                        <td className="text-end fw-bold">{p.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
