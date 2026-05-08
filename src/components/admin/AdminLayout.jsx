import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/admin.css';

const AdminLayout = ({ children, pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('barq_admin_auth');
    if (!auth) {
      navigate('/admin');
      return;
    }
    try {
      setUser(JSON.parse(auth));
    } catch (e) {
      localStorage.removeItem('barq_admin_auth');
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('barq_admin_auth');
    navigate('/admin');
  };

  const navItems = [
    { label: 'تسجيل الدخول  ', icon: 'fa-th-large', path: '/admin/dashboard' },
    { section: 'إدارة المحتوى' },
    { label: 'الخدمات', icon: 'fa-cogs', path: '/admin/services' },
    { label: 'العملاء والشركاء', icon: 'fa-handshake', path: '/admin/clients' },
    { label: 'المدونة والمقالات', icon: 'fa-newspaper', path: '/admin/blog' },
    { label: 'الرسائل والطلبات', icon: 'fa-envelope', path: '/admin/messages' },
    { label: 'المشاريع', icon: 'fa-project-diagram', path: '/admin/projects' },
    { label: 'مكتبة الوسائط', icon: 'fa-images', path: '/admin/media' },
    { section: 'التحسينات' },
    { label: 'تحسين SEO', icon: 'fa-search', path: '/admin/seo' },
    { label: 'الإحصائيات', icon: 'fa-chart-bar', path: '/admin/analytics' },
    { label: 'سجلات النظام', icon: 'fa-history', path: '/admin/logs' },
    { section: 'النظام' },
    { label: 'الإعدادات', icon: 'fa-sliders-h', path: '/admin/settings' },
    { label: 'المستخدمين', icon: 'fa-users-cog', path: '/admin/users' },
  ];

  if (!user) return null;

  return (
    <div className="admin-layout" dir="rtl">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <img src="/white.png" alt="Barq Tech" />
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item, i) => {
            if (item.section) {
              return <div className="nav-section-title" key={i}>{item.section}</div>;
            }
            return (
              <div className="nav-item" key={i}>
                <button
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                >
                  <i className={`fa ${item.icon}`}></i>
                  {item.label}
                </button>
              </div>
            );
          })}
          <div className="nav-item" style={{ marginTop: '20px' }}>
            <button className="nav-link" onClick={handleLogout}>
              <i className="fa fa-sign-out-alt"></i>
              تسجيل الخروج
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="btn-admin outline sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <span className="page-title">{pageTitle}</span>
          </div>
          <div className="user-menu">
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-admin outline btn-admin-sm d-none d-sm-flex">
              <i className="fa fa-external-link-alt"></i>
              عرض الموقع
            </a>
            <div className="user-avatar">{user.name?.charAt(0) || 'M'}</div>
          </div>
        </div>

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
