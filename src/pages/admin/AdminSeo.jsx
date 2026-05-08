import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import { api } from '../../utils/api';

const AdminSeo = () => {
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', keywords: '', og_image: '', canonical_url: '' });

  const [globalSettings, setGlobalSettings] = useState({
    site_name: '',
    site_tagline: '',
    google_verification: '',
    bing_verification: '',
    robots_txt: 'User-agent: *\nAllow: /\nSitemap: https://barqtech.ai/sitemap.xml',
    sitemap_url: 'https://barqtech.ai/sitemap.xml',
  });

  const fetchSeoData = async () => {
    try {
      const pagesData = await api.get('/seo');
      setPages(pagesData);
      
      const settingsData = await api.get('/settings');
      setGlobalSettings(prev => ({
        ...prev,
        site_name: settingsData.site_name || '',
        google_verification: settingsData.google_verification || ''
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  const handleEdit = (page) => {
    setEditingPage(page);
    setForm({
      title: page.title || '',
      description: page.description || '',
      keywords: page.keywords || '',
      og_image: page.og_image || '',
      canonical_url: page.canonical_url || ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const newScore = Math.min(100, (editingPage.score || 0) + 10);
      await api.put(`/seo/${editingPage.id}`, { ...form, score: newScore });
      setShowModal(false);
      fetchSeoData();
    } catch (err) {
      alert('خطأ: ' + err.message);
    }
  };

  const handleSaveGlobal = async () => {
    try {
      await api.put('/settings', globalSettings);
      alert('تم حفظ الإعدادات العامة بنجاح');
    } catch (err) {
      alert('خطأ: ' + err.message);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <AdminLayout pageTitle="تحسين محركات البحث (SEO)">
      {/* Global SEO Settings */}
      <div className="admin-table-card mb-4">
        <div className="card-header">
          <h5><i className="fa fa-globe me-2"></i>إعدادات SEO العامة</h5>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label className="admin-label">اسم الموقع</label>
                <input
                  className="admin-input"
                  value={globalSettings.site_name}
                  onChange={e => setGlobalSettings({...globalSettings, site_name: e.target.value})}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="admin-label">Google Verification Code</label>
                <input
                  className="admin-input"
                  value={globalSettings.google_verification}
                  onChange={e => setGlobalSettings({...globalSettings, google_verification: e.target.value})}
                  placeholder="Google site verification meta tag"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="col-12">
              <button className="btn-admin primary" onClick={handleSaveGlobal}>
                <i className="fa fa-save me-1"></i> حفظ الإعدادات العامة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Per-Page SEO */}
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-file-alt me-2"></i>SEO لكل صفحة</h5>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>الصفحة</th>
                <th>المسار</th>
                <th>العنوان (Title)</th>
                <th>نقاط SEO</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page.id}>
                  <td style={{ fontWeight: 600 }}>{page.page_name}</td>
                  <td dir="ltr" style={{ fontSize: '0.85rem', color: '#6b7280' }}>{page.page_path}</td>
                  <td style={{ maxWidth: '250px', fontSize: '0.85rem' }}>{page.title}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${page.score || 0}%`, height: '100%', background: getScoreColor(page.score || 0), borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: getScoreColor(page.score || 0) }}>{page.score || 0}%</span>
                    </div>
                  </td>
                  <td>
                    <button className="btn-admin primary btn-admin-sm" onClick={() => handleEdit(page)}>
                      <i className="fa fa-edit"></i> تحسين
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h5>تحسين SEO — {editingPage.page_name}</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="admin-label">عنوان الصفحة (Title Tag) — يُفضل 50-60 حرف</label>
                <input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                <small style={{ color: form.title.length > 60 ? '#ef4444' : '#10b981' }}>{form.title.length}/60</small>
              </div>
              <div className="form-group">
                <label className="admin-label">الوصف (Meta Description) — يُفضل 150-160 حرف</label>
                <textarea className="admin-input" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <small style={{ color: form.description.length > 160 ? '#ef4444' : '#10b981' }}>{form.description.length}/160</small>
              </div>
              <div className="form-group">
                <label className="admin-label">الكلمات المفتاحية (مفصولة بفاصلة)</label>
                <input className="admin-input" value={form.keywords} onChange={e => setForm({...form, keywords: e.target.value})} />
              </div>
              <ImageUploader
                label="صورة المشاركة (OG Image)"
                value={form.og_image}
                onChange={val => setForm({...form, og_image: val})}
              />
              <div className="form-group">
                <label className="admin-label">Canonical URL</label>
                <input className="admin-input" value={form.canonical_url} onChange={e => setForm({...form, canonical_url: e.target.value})} placeholder="https://barqtech.ai/..." dir="ltr" />
              </div>

              {/* SEO Preview */}
              <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '16px', marginTop: '8px' }}>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '4px' }}>معاينة نتيجة البحث على Google:</p>
                <div style={{ fontSize: '1.1rem', color: '#1a0dab', fontWeight: 500, marginBottom: '2px' }}>{form.title || 'عنوان الصفحة'}</div>
                <div style={{ fontSize: '0.8rem', color: '#006621', marginBottom: '4px' }} dir="ltr">barqtech.ai{editingPage.page_path}</div>
                <div style={{ fontSize: '0.85rem', color: '#545454' }}>{form.description || 'وصف الصفحة...'}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave}>
                <i className="fa fa-save me-1"></i> حفظ التحسينات
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSeo;
