import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }) // We still send as 'email' property to the backend for compatibility
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل تسجيل الدخول');
      }

      localStorage.setItem('barq_admin_auth', JSON.stringify({
        ...data.user,
        token: data.token
      }));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="logo-container">
          <img src="/two colors.png" alt="Barq Tech" style={{ maxHeight: '50px' }} />
          <h4>لوحة التحكم</h4>
          <p style={{ fontSize: '0.85rem' }}>سجل دخولك للوصول إلى الإدارة</p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            <i className="fa fa-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '8px'
            }}>
              اسم المستخدم
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="barq user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                dir="ltr"
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '8px'
            }}>
              كلمة المرور
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
              />
              <button
                type="button"
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', borderLeft: 'none', borderRight: '2px solid #e5e7eb', borderRadius: '0 10px 10px 0' }}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-admin-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                جارٍ تسجيل الدخول...
              </>
            ) : (
              <>
                <i className="fa fa-sign-in-alt me-2"></i>
                تسجيل الدخول
              </>
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0 }}>
            © {new Date().getFullYear()} Barq Tech — لوحة التحكم
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
