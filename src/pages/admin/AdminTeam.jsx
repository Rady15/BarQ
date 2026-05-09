import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import { api, getImageUrl } from '../../utils/api';
import Swal from 'sweetalert2';

const AdminTeam = () => {
  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name_ar: '', name_en: '', role_ar: '', role_en: '', bio_ar: '', bio_en: '', image: '', email: '', linkedin: '', twitter: '', sort_order: 0, is_active: 1 });

  const fetchData = async () => {
    try {
      const data = await api.get('/team?all=true');
      setTeam(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    setForm({ name_ar: '', name_en: '', role_ar: '', role_en: '', bio_ar: '', bio_en: '', image: '', email: '', linkedin: '', twitter: '', sort_order: team.length + 1, is_active: 1 });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({ 
      name_ar: item.name_ar, 
      name_en: item.name_en || '', 
      role_ar: item.role_ar || '', 
      role_en: item.role_en || '', 
      bio_ar: item.bio_ar || '',
      bio_en: item.bio_en || '',
      image: item.image || '',
      email: item.email || '',
      linkedin: item.linkedin || '',
      twitter: item.twitter || '',
      sort_order: item.sort_order || 0,
      is_active: item.is_active
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await api.put(`/team/${editingItem.id}`, form);
      } else {
        await api.post('/team', form);
      }
      setShowModal(false);
      fetchData();
      Swal.fire({ title: 'نجاح', text: 'تم حفظ بيانات العضو بنجاح', icon: 'success', confirmButtonText: 'حسناً' });
    } catch (err) {
      Swal.fire({ title: 'خطأ', text: err.message, icon: 'error', confirmButtonText: 'حسناً' });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من التراجع عن هذا!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء'
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/team/${id}`);
        fetchData();
        Swal.fire('تم الحذف!', 'تم حذف العضو بنجاح.', 'success');
      } catch (err) {
        Swal.fire('خطأ', err.message, 'error');
      }
    }
  };

  return (
    <AdminLayout pageTitle="إدارة فريق العمل">
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-users me-2"></i>فريق العمل ({team.length})</h5>
          <button className="btn-admin primary" onClick={handleAdd}>
            <i className="fa fa-plus"></i> إضافة عضو
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>التسلسل</th>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>المسمى الوظيفي</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {team.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.sort_order}</td>
                  <td>
                    {item.image ? (
                      <img src={getImageUrl(item.image)} alt={item.name_ar} style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '40px', width: '40px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa fa-user" style={{ color: '#d1d5db' }}></i>
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.name_ar}</td>
                  <td>{item.role_ar}</td>
                  <td><span className={`admin-badge ${item.is_active ? 'active' : 'inactive'}`}>{item.is_active ? 'مفعّل' : 'معطّل'}</span></td>
                  <td>
                    <button className="btn-admin warning btn-admin-sm me-2" onClick={() => handleEdit(item)}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn-admin danger btn-admin-sm" onClick={() => handleDelete(item.id)}>
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
              <h5>{editingItem ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>الاسم (عربي) *</label>
                    <input value={form.name_ar} onChange={e => setForm({...form, name_ar: e.target.value})} className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>الاسم (إنجليزي)</label>
                    <input value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} className="form-control" dir="ltr" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>المسمى الوظيفي (عربي)</label>
                    <input value={form.role_ar} onChange={e => setForm({...form, role_ar: e.target.value})} className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>المسمى الوظيفي (إنجليزي)</label>
                    <input value={form.role_en} onChange={e => setForm({...form, role_en: e.target.value})} className="form-control" dir="ltr" />
                  </div>
                </div>
                <div className="col-12">
                  <ImageUploader label="صورة العضو" value={form.image} onChange={val => setForm({...form, image: val})} />
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>البريد الإلكتروني</label>
                    <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="form-control" dir="ltr" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>رابط لينكد إن</label>
                    <input value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} className="form-control" dir="ltr" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>رابط منصة X</label>
                    <input value={form.twitter} onChange={e => setForm({...form, twitter: e.target.value})} className="form-control" dir="ltr" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>نبذة (عربي)</label>
                    <textarea value={form.bio_ar} onChange={e => setForm({...form, bio_ar: e.target.value})} className="form-control" rows="2"></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>الترتيب (للعرض)</label>
                    <input type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: e.target.value})} className="form-control" />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <div className="form-group d-flex align-items-center mt-4">
                    <input type="checkbox" id="isActiveTeam" checked={form.is_active === 1} onChange={e => setForm({...form, is_active: e.target.checked ? 1 : 0})} style={{ width: 'auto', marginLeft: '10px' }} />
                    <label htmlFor="isActiveTeam" className="mb-0">مفعّل ويظهر في الموقع</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave} disabled={!form.name_ar}>
                <i className="fa fa-save me-1"></i> {editingItem ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTeam;
