import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../utils/api';
import { showSuccess, showError } from '../../utils/alerts';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    site_url: '',
    site_email: '',
    site_phone: '',
    site_whatsapp: '',
    site_address_ar: '',
    site_address_en: '',
    site_map_link: '',
    about_text_ar: '',
    about_text_en: '',
    vision_text_ar: '',
    vision_text_en: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: '',
    tiktok_url: '',
    ga_measurement_id: '',
    primary_color: '#082e71',
  });
  
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.get('/settings');
        setSettings(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error(err);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      await api.put('/settings', settings);
      setSaved(true);
      showSuccess('تم الحفظ', 'تم تحديث الإعدادات بنجاح');
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      showError('خطأ', 'فشل في حفظ الإعدادات: ' + err.message);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new) {
      showError('حقول ناقصة', 'يرجى إدخال كلمة المرور الحالية والجديدة');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      showError('خطأ', 'كلمات المرور الجديدة غير متطابقة');
      return;
    }
    try {
      await api.put('/auth/password', { currentPassword: passwords.current, newPassword: passwords.new });
      showSuccess('تم التغيير', 'تم تغيير كلمة المرور بنجاح');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (err) {
      showError('خطأ', err.message);
    }
  };


  return (
    <AdminLayout pageTitle="إعدادات الموقع">
      {saved && (
        <div style={{
          background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46',
          padding: '12px 20px', borderRadius: '10px', marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <i className="fa fa-check-circle"></i>
          تم حفظ الإعدادات بنجاح!
        </div>
      )}

      {/* General Settings */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fa fa-cog me-2"></i>الإعدادات العامة</h5>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="admin-label">اسم الموقع</label>
              <input className="admin-input" value={settings.site_name} onChange={e => handleChange('site_name', e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="admin-label">رابط الموقع</label>
              <input className="admin-input" value={settings.site_url} onChange={e => handleChange('site_url', e.target.value)} dir="ltr" />
            </div>
            <div className="col-md-6">
              <label className="admin-label">البريد الإلكتروني</label>
              <input className="admin-input" value={settings.site_email} onChange={e => handleChange('site_email', e.target.value)} dir="ltr" />
            </div>
            <div className="col-md-6">
              <label className="admin-label">رقم الهاتف</label>
              <input className="admin-input" value={settings.site_phone} onChange={e => handleChange('site_phone', e.target.value)} dir="ltr" />
            </div>
            <div className="col-md-6">
              <label className="admin-label">رقم الواتساب</label>
              <input className="admin-input" value={settings.site_whatsapp} onChange={e => handleChange('site_whatsapp', e.target.value)} dir="ltr" />
            </div>
            <div className="col-md-6">
              <label className="admin-label">اللون الرئيسي</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input type="color" value={settings.primary_color} onChange={e => handleChange('primary_color', e.target.value)} style={{ width: '50px', height: '40px', border: 'none', cursor: 'pointer' }} />
                <input className="admin-input" style={{ flex: 1 }} value={settings.primary_color} onChange={e => handleChange('primary_color', e.target.value)} dir="ltr" />
              </div>
            </div>
            <div className="col-md-6">
              <label className="admin-label">العنوان (عربي)</label>
              <input className="admin-input" value={settings.site_address_ar} onChange={e => handleChange('site_address_ar', e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="admin-label">العنوان (إنجليزي)</label>
              <input className="admin-input" value={settings.site_address_en} onChange={e => handleChange('site_address_en', e.target.value)} dir="ltr" />
            </div>
            <div className="col-md-12">
              <label className="admin-label">رابط الخريطة (Google Maps)</label>
              <input className="admin-input" value={settings.site_map_link} onChange={e => handleChange('site_map_link', e.target.value)} dir="ltr" />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fa fa-info-circle me-2"></i>قصة العلامة التجارية (من نحن والرؤية)</h5>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="admin-label">من نحن (عربي)</label>
              <textarea className="admin-input" style={{ height: '120px' }} value={settings.about_text_ar} onChange={e => handleChange('about_text_ar', e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="admin-label">About Us (English)</label>
              <textarea className="admin-input" style={{ height: '120px' }} value={settings.about_text_en} onChange={e => handleChange('about_text_en', e.target.value)} dir="ltr" />
            </div>
            <div className="col-md-6">
              <label className="admin-label">الرؤية (عربي)</label>
              <textarea className="admin-input" style={{ height: '120px' }} value={settings.vision_text_ar} onChange={e => handleChange('vision_text_ar', e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="admin-label">Vision (English)</label>
              <textarea className="admin-input" style={{ height: '120px' }} value={settings.vision_text_en} onChange={e => handleChange('vision_text_en', e.target.value)} dir="ltr" />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fa fa-share-alt me-2"></i>وسائل التواصل الاجتماعي</h5>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="row g-3">
            {[
              { key: 'facebook_url', label: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877f2' },
              { key: 'twitter_url', label: 'Twitter / X', icon: 'fab fa-twitter', color: '#1da1f2' },
              { key: 'linkedin_url', label: 'LinkedIn', icon: 'fab fa-linkedin-in', color: '#0a66c2' },
              { key: 'instagram_url', label: 'Instagram', icon: 'fab fa-instagram', color: '#e4405f' },
              { key: 'tiktok_url', label: 'TikTok', icon: 'fab fa-tiktok', color: '#000' },
            ].map(social => (
              <div className="col-md-6" key={social.key}>
                <label className="admin-label">
                  <i className={`${social.icon} me-2`} style={{ color: social.color }}></i>
                  {social.label}
                </label>
                <input
                  className="admin-input"
                  value={settings[social.key]}
                  onChange={e => handleChange(social.key, e.target.value)}
                  placeholder={`https://${social.key.replace('_url', '')}.com/barqtech`}
                  dir="ltr"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Google Analytics */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fab fa-google me-2"></i>Google Analytics</h5>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="admin-label">Measurement ID</label>
              <input className="admin-input" value={settings.ga_measurement_id} onChange={e => handleChange('ga_measurement_id', e.target.value)} placeholder="G-XXXXXXXXXX" dir="ltr" />
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                <i className="fa fa-info-circle me-1"></i>
                يمكنك الحصول على المعرف من <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">Google Analytics</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fa fa-lock me-2"></i>تغيير كلمة المرور</h5>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="admin-label">كلمة المرور الحالية</label>
              <input type="password" className="admin-input" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} placeholder="••••••••" dir="ltr" />
            </div>
            <div className="col-md-6">
              <label className="admin-label">كلمة المرور الجديدة</label>
              <input type="password" className="admin-input" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} placeholder="••••••••" dir="ltr" />
            </div>
            <div className="col-md-6">
              <label className="admin-label">تأكيد كلمة المرور</label>
              <input type="password" className="admin-input" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} placeholder="••••••••" dir="ltr" />
            </div>
            <div className="col-12">
              <button className="btn-admin warning" onClick={handlePasswordChange}>
                <i className="fa fa-key me-1"></i> تغيير كلمة المرور
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Tools */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fa fa-tools me-2"></i>أدوات النظام</h5>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>وضع الصيانة (Maintenance Mode)</div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>عند التفعيل، سيظهر للمستخدمين صفحة "قيد الصيانة"</div>
                </div>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    style={{ width: '50px', height: '25px', cursor: 'pointer' }}
                    checked={settings.maintenance_mode === '1'} 
                    onChange={async (e) => {
                      const enabled = e.target.checked;
                      try {
                        await api.post('/system/maintenance', { enabled });
                        handleChange('maintenance_mode', enabled ? '1' : '0');
                      } catch (err) {
                        alert('خطأ في تغيير وضع الصيانة');
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f9fafb', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>نسخة احتياطية لقاعدة البيانات</div>
                  <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>تحميل نسخة كاملة من بيانات الموقع (SQLite)</div>
                </div>
                <button className="btn-admin info" onClick={() => window.open(`${api.defaults.baseURL}/system/backup`, '_blank')}>
                  <i className="fa fa-download me-1"></i> تحميل النسخة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button className="btn-admin primary" onClick={handleSave} style={{ padding: '14px 40px', fontSize: '1rem' }}>
          <i className="fa fa-save me-2"></i> حفظ جميع الإعدادات
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
