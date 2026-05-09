import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { api, getImageUrl } from '../../utils/api';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';

const AdminBlog = () => {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState({ title_ar: '', title_en: '', content_ar: '', content_en: '', status: 'draft', category: '', image: '' });

  const fetchArticles = async () => {
    try {
      const data = await api.get('/articles');
      setArticles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAdd = () => {
    setEditingArticle(null);
    setForm({ title_ar: '', title_en: '', content_ar: '', content_en: '', status: 'draft', category: '', image: '' });
    setShowModal(true);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setForm({
      title_ar: article.title_ar, title_en: article.title_en || '',
      content_ar: article.content_ar || '', content_en: article.content_en || '',
      status: article.status, category: article.category || '',
      image: article.image || ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingArticle) {
        await api.put(`/articles/${editingArticle.id}`, form);
        showSuccess('تم التحديث', 'تم تحديث المقال بنجاح');
      } else {
        await api.post('/articles', form);
        showSuccess('تم النشر', 'تم إضافة المقال الجديد بنجاح');
      }
      setShowModal(false);
      fetchArticles();
    } catch (err) {
      showError('خطأ', err.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('حذف المقال', 'هل أنت متأكد من حذف هذا المقال نهائياً؟');
    if (result.isConfirmed) {
      try {
        await api.delete(`/articles/${id}`);
        fetchArticles();
        showSuccess('تم الحذف', 'تم حذف المقال بنجاح');
      } catch (err) {
        showError('خطأ', err.message);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      const article = articles.find(a => a.id === id);
      await api.put(`/articles/${id}`, { ...article, status: newStatus });
      fetchArticles();
      showSuccess('تم تغيير الحالة', `تم تحويل المقال إلى ${newStatus === 'published' ? 'منشور' : 'مسودة'}`);
    } catch (err) {
      showError('خطأ', err.message);
    }
  };

  return (
    <AdminLayout pageTitle="إدارة المدونة والمقالات">
      {/* Stats */}
      <div className="row g-4 mb-4">
        <div className="col-sm-4">
          <div className="admin-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-number">{articles.length}</div>
                <div className="stat-label">إجمالي المقالات</div>
              </div>
              <div className="stat-icon primary"><i className="fa fa-newspaper"></i></div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="admin-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-number">{articles.filter(a => a.status === 'published').length}</div>
                <div className="stat-label">مقالات منشورة</div>
              </div>
              <div className="stat-icon success"><i className="fa fa-check-circle"></i></div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="admin-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="stat-number">{articles.reduce((sum, a) => sum + (a.views || 0), 0)}</div>
                <div className="stat-label">إجمالي المشاهدات</div>
              </div>
              <div className="stat-icon warning"><i className="fa fa-eye"></i></div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-pen-fancy me-2"></i>المقالات</h5>
          <button className="btn-admin primary" onClick={handleAdd}>
            <i className="fa fa-plus"></i> كتابة مقال جديد
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الغلاف</th>
                <th>العنوان</th>
                <th>التاريخ</th>
                <th>المشاهدات</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr key={article.id}>
                  <td>{i + 1}</td>
                  <td>
                    {article.image ? (
                      <img src={getImageUrl(article.image)} alt="" style={{ height: '40px', width: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '40px', width: '60px', borderRadius: '6px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa fa-image" style={{ color: '#d1d5db' }}></i>
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: '250px' }}>{article.title_ar}</td>
                  <td dir="ltr" style={{ fontSize: '0.85rem' }}>{new Date(article.created_at).toLocaleDateString()}</td>
                  <td>{article.views || 0}</td>
                  <td>
                    <span className={`admin-badge ${article.status}`} style={{ cursor: 'pointer' }} onClick={() => toggleStatus(article.id, article.status)}>
                      {article.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-admin warning btn-admin-sm me-2" onClick={() => handleEdit(article)}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn-admin danger btn-admin-sm" onClick={() => handleDelete(article.id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <div className="modal-header">
              <h5>{editingArticle ? 'تعديل المقال' : 'كتابة مقال جديد'}</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>العنوان (عربي)</label>
                    <input value={form.title_ar} onChange={e => setForm({...form, title_ar: e.target.value})} placeholder="عنوان المقال بالعربية" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>العنوان (إنجليزي)</label>
                    <input value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} placeholder="Article title in English" dir="ltr" />
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>التصنيف</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                      <option value="">اختر التصنيف</option>
                      <option value="ai">ذكاء اصطناعي</option>
                      <option value="web">تطوير ويب</option>
                      <option value="digital">تحول رقمي</option>
                      <option value="seo">SEO</option>
                      <option value="automation">أتمتة</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>الحالة</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                      <option value="draft">مسودة</option>
                      <option value="published">نشر فوري</option>
                    </select>
                  </div>
                </div>
              </div>

              <ImageUploader
                label="صورة الغلاف"
                value={form.image}
                onChange={val => setForm({...form, image: val})}
              />

              <RichTextEditor
                label="المحتوى (عربي)"
                value={form.content_ar}
                onChange={val => setForm({...form, content_ar: val})}
                placeholder="اكتب محتوى المقال هنا..."
              />
              <RichTextEditor
                label="المحتوى (إنجليزي)"
                value={form.content_en}
                onChange={val => setForm({...form, content_en: val})}
                placeholder="Write article content in English..."
              />
            </div>
            <div className="modal-footer">
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave}>
                <i className="fa fa-save me-1"></i> {editingArticle ? 'تحديث' : 'نشر المقال'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBlog;
