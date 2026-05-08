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
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [res, logs] = await Promise.all([
          api.get('/dashboard'),
          api.get('/audit-logs')
        ]);
        setData(res);
        setActivities(logs.slice(0, 8));
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { label: 'الخدمات', value: data.services, icon: 'fa-cogs', color: 'primary' },
    { label: 'المشاريع', value: data.projects, icon: 'fa-project-diagram', color: 'info' },
    { label: 'المقالات', value: data.articles, icon: 'fa-newspaper', color: 'warning' },
    { label: 'رسائل جديدة', value: data.unreadMessages, icon: 'fa-envelope', color: 'success' },
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
        <div className="col-lg-8">
          <div className="admin-table-card">
            <div className="card-header">
              <h5><i className="fa fa-clock me-2"></i>النشاط الأخير</h5>
            </div>
            <div style={{ padding: '16px 24px', overflowX: 'auto' }}>
              <div style={{ minWidth: '400px' }}>
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

        {/* Quick Actions */}
        <div className="col-lg-4">
          <div className="admin-table-card" style={{ height: '100%' }}>
            <div className="card-header">
              <h5><i className="fa fa-bolt me-2"></i>إجراءات سريعة</h5>
            </div>
            <div style={{ padding: '20px 24px' }}>
              {[
                { label: 'إضافة خدمة جديدة', icon: 'fa-plus-circle', path: '/admin/services' },
                { label: 'كتابة مقال جديد', icon: 'fa-pen', path: '/admin/blog' },
                { label: 'إضافة عميل', icon: 'fa-user-plus', path: '/admin/clients' },
                { label: 'إعدادات SEO', icon: 'fa-search', path: '/admin/seo' },
              ].map((action, i) => (
                <button key={i} className="btn-admin outline" style={{
                  width: '100%', marginBottom: '10px', justifyContent: 'flex-start',
                  padding: '12px 16px'
                }}
                onClick={() => window.location.href = action.path}
                >
                  <i className={`fa ${action.icon} me-2`} style={{ color: '#082e71' }}></i>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
