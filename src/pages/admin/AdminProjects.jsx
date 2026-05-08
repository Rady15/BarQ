import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import { api, getImageUrl } from '../../utils/api';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({ title_ar: '', title_en: '', client_name: '', description_ar: '', description_en: '', image: '', status: 'draft', category: '' });

  const fetchProjects = async () => {
    try {
      const data = await api.get('/projects');
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = () => {
    setEditingProject(null);
    setForm({ title_ar: '', title_en: '', client_name: '', description_ar: '', description_en: '', image: '', status: 'draft', category: '' });
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title_ar: project.title_ar, title_en: project.title_en || '', client_name: project.client_name || '',
      description_ar: project.description_ar || '', description_en: project.description_en || '',
      image: project.image || '', status: project.status, category: project.category || ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, form);
      } else {
        await api.post('/projects', form);
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      alert('خطأ: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert('خطأ: ' + err.message);
      }
    }
  };

  return (
    <AdminLayout pageTitle="إدارة المشاريع">
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-project-diagram me-2"></i>المشاريع ({projects.length})</h5>
          <button className="btn-admin primary" onClick={handleAdd}>
            <i className="fa fa-plus"></i> إضافة مشروع
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الصورة</th>
                <th>اسم المشروع</th>
                <th>العميل</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr key={project.id}>
                  <td>{i + 1}</td>
                  <td>
                    {project.image ? (
                      <img src={getImageUrl(project.image)} alt={project.title_ar} style={{ height: '45px', width: '65px', borderRadius: '6px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '45px', width: '65px', borderRadius: '6px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa fa-image" style={{ color: '#d1d5db' }}></i>
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{project.title_ar}</td>
                  <td style={{ color: '#6b7280' }}>{project.client_name}</td>
                  <td>
                    <span className={`admin-badge ${project.status}`}>
                      {project.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-admin warning btn-admin-sm me-2" onClick={() => handleEdit(project)}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn-admin danger btn-admin-sm" onClick={() => handleDelete(project.id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h5>{editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>اسم المشروع (عربي)</label>
                    <input value={form.title_ar} onChange={e => setForm({...form, title_ar: e.target.value})} placeholder="مثال: منصة إدارة المخزون" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>اسم المشروع (إنجليزي)</label>
                    <input value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} placeholder="e.g. Inventory Platform" dir="ltr" />
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>اسم العميل</label>
                    <input value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} placeholder="اسم الشركة أو العميل" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>التصنيف</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                      <option value="">اختر التصنيف</option>
                      <option value="web">تطوير ويب</option>
                      <option value="mobile">تطبيقات موبايل</option>
                      <option value="ai">ذكاء اصطناعي</option>
                      <option value="erp">أنظمة ERP</option>
                      <option value="ecommerce">تجارة إلكترونية</option>
                    </select>
                  </div>
                </div>
              </div>

              <ImageUploader
                label="صورة المشروع"
                value={form.image}
                onChange={val => setForm({...form, image: val})}
              />

              <div className="form-group">
                <label>وصف المشروع (عربي)</label>
                <textarea rows="4" value={form.description_ar} onChange={e => setForm({...form, description_ar: e.target.value})} placeholder="وصف تفصيلي للمشروع بالعربية..." />
              </div>
              <div className="form-group">
                <label>وصف المشروع (إنجليزي)</label>
                <textarea rows="3" value={form.description_en} onChange={e => setForm({...form, description_en: e.target.value})} placeholder="Project description in English..." dir="ltr" />
              </div>
              <div className="form-group">
                <label>الحالة</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="draft">مسودة</option>
                  <option value="published">منشور</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave}>
                <i className="fa fa-save me-1"></i> {editingProject ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjects;
