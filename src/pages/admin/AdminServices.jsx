import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { api, getImageUrl } from '../../utils/api';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({ 
    title_ar: '', title_en: '', icon: '', icon_image: '', 
    description_ar: '', description_en: '', 
    excerpt_ar: '', excerpt_en: '',
    image: '', is_active: 1 
  });

  const fetchServices = async () => {
    try {
      const data = await api.get('/services');
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = () => {
    setEditingService(null);
    setForm({ 
      title_ar: '', title_en: '', icon: '', icon_image: '', 
      description_ar: '', description_en: '', 
      excerpt_ar: '', excerpt_en: '',
      image: '', is_active: 1 
    });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setForm({
      title_ar: service.title_ar, title_en: service.title_en || '',
      icon: service.icon || '', icon_image: service.icon_image || '',
      description_ar: service.description_ar || '', description_en: service.description_en || '',
      excerpt_ar: service.excerpt_ar || '', excerpt_en: service.excerpt_en || '',
      image: service.image || '', is_active: service.is_active
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingService) {
        await api.put(`/services/${editingService.id}`, form);
        showSuccess('تم التحديث', 'تم تحديث بيانات الخدمة بنجاح');
      } else {
        await api.post('/services', form);
        showSuccess('تمت الإضافة', 'تمت إضافة الخدمة الجديدة بنجاح');
      }
      setShowModal(false);
      fetchServices();
    } catch (err) {
      showError('خطأ', err.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('حذف الخدمة', 'هل أنت متأكد من حذف هذه الخدمة؟');
    if (result.isConfirmed) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
        showSuccess('تم الحذف', 'تم حذف الخدمة بنجاح');
      } catch (err) {
        showError('خطأ', err.message);
      }
    }
  };

  return (
    <AdminLayout pageTitle="إدارة الخدمات">
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-cogs me-2"></i>الخدمات ({services.length})</h5>
          <button className="btn-admin primary" onClick={handleAdd}>
            <i className="fa fa-plus"></i> إضافة خدمة
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الصورة</th>
                <th>الاسم (عربي)</th>
                <th>الاسم (إنجليزي)</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, i) => (
                <tr key={service.id}>
                  <td>{i + 1}</td>
                  <td>
                    {service.image ? (
                      <img src={getImageUrl(service.image)} alt={service.title_ar} style={{ height: '40px', width: '60px', borderRadius: '6px', objectFit: 'cover' }} />
                    ) : (
                      <i className={`fa ${service.icon} fa-lg`} style={{ color: '#082e71' }}></i>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{service.title_ar}</td>
                  <td>{service.title_en}</td>
                  <td><span className="admin-badge active">{service.is_active ? 'مفعّل' : 'معطّل'}</span></td>
                  <td>
                    <button className="btn-admin warning btn-admin-sm me-2" onClick={() => handleEdit(service)}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn-admin danger btn-admin-sm" onClick={() => handleDelete(service.id)}>
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
              <h5>{editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>اسم الخدمة (عربي)</label>
                    <input value={form.title_ar} onChange={e => setForm({...form, title_ar: e.target.value})} placeholder="مثال: تطوير المواقع" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>اسم الخدمة (إنجليزي)</label>
                    <input value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} placeholder="e.g. Web Development" dir="ltr" />
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>أيقونة FontAwesome (اختياري)</label>
                    <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} placeholder="fa-laptop-code" dir="ltr" />
                    {form.icon && (
                      <div style={{ marginTop: '8px' }}>
                        <i className={`fa ${form.icon} fa-2x`} style={{ color: '#082e71' }}></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <ImageUploader
                    label="أيقونة مخصصة (رفع صورة)"
                    value={form.icon_image}
                    onChange={val => setForm({...form, icon_image: val})}
                  />
                </div>
              </div>

              <ImageUploader
                label="صورة الخدمة"
                value={form.image}
                onChange={val => setForm({...form, image: val})}
              />

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>وصف مختصر (يظهر بالرئيسية - عربي)</label>
                    <textarea 
                      value={form.excerpt_ar} 
                      onChange={e => setForm({...form, excerpt_ar: e.target.value})} 
                      rows="3" 
                      placeholder="أدخل وصفاً موجزاً..."
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>وصف مختصر (يظهر بالرئيسية - إنجليزي)</label>
                    <textarea 
                      value={form.excerpt_en} 
                      onChange={e => setForm({...form, excerpt_en: e.target.value})} 
                      rows="3" 
                      dir="ltr"
                      placeholder="Enter a brief summary..."
                    />
                  </div>
                </div>
              </div>

              <RichTextEditor
                label="الوصف (عربي)"
                value={form.description_ar}
                onChange={val => {
                  if (val !== form.description_ar) {
                    setForm(prev => ({ ...prev, description_ar: val }));
                  }
                }}
              />
              <RichTextEditor
                label="الوصف (إنجليزي)"
                value={form.description_en}
                onChange={val => {
                  if (val !== form.description_en) {
                    setForm(prev => ({ ...prev, description_en: val }));
                  }
                }}
              />
              <div className="mt-4 pt-4 border-top">
                <h6 style={{ fontWeight: 700, color: '#082e71', marginBottom: '15px' }}>
                  <i className="fa fa-th-large me-2"></i>
                  مميزات الخدمة (كروت الأهمية والفرق)
                </h6>
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '12px' }}>
                  {!editingService ? (
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>يرجى حفظ الخدمة أولاً لكي تتمكن من إضافة المميزات.</p>
                  ) : (
                    <>
                      <div className="admin-table-wrapper" style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '15px' }}>
                        <table className="admin-table table-sm">
                          <thead>
                            <tr>
                              <th>الأيقونة</th>
                              <th>العنوان</th>
                              <th>القسم</th>
                              <th>إجراء</th>
                            </tr>
                          </thead>
                          <tbody>
                            {editingService.features?.map(f => (
                              <tr key={f.id}>
                                <td><i className={`fa ${f.icon}`}></i></td>
                                <td>{f.title_ar}</td>
                                <td>{f.section === 'why' ? 'الأهمية' : 'الفرق'}</td>
                                <td>
                                  <button className="btn-admin danger btn-admin-sm" onClick={async () => {
                                    if(window.confirm('حذف الميزة؟')) {
                                      await api.delete(`/services/features/${f.id}`);
                                      const updated = await api.get(`/services/${editingService.id}`);
                                      setEditingService(updated);
                                    }
                                  }}>✕</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="row g-2 align-items-end mt-2">
                        <div className="col-md-2">
                          <label style={{fontSize: '0.75rem'}}>الأيقونة</label>
                          <input id="f_icon" className="form-control form-control-sm" placeholder="fa-check" />
                        </div>
                        <div className="col-md-3">
                          <label style={{fontSize: '0.75rem'}}>العنوان (عربي)</label>
                          <input id="f_title" className="form-control form-control-sm" />
                        </div>
                        <div className="col-md-2">
                          <label style={{fontSize: '0.75rem'}}>القسم</label>
                          <select id="f_section" className="form-select form-select-sm">
                            <option value="why">الأهمية</option>
                            <option value="how">الفرق</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label style={{fontSize: '0.75rem'}}>الوصف النصي</label>
                          <input id="f_desc" className="form-control form-control-sm" placeholder="وصف الميزة..." />
                        </div>
                        <div className="col-md-2">
                          <button className="btn-admin primary btn-admin-sm w-100" onClick={async () => {
                            const feat = {
                              service_id: editingService.id,
                              icon: document.getElementById('f_icon').value,
                              title_ar: document.getElementById('f_title').value,
                              section: document.getElementById('f_section').value,
                              description_ar: document.getElementById('f_desc').value || '',
                            };
                            await api.post(`/services/${editingService.id}/features`, feat);
                            const updated = await api.get(`/services/${editingService.id}`);
                            setEditingService(updated);
                            document.getElementById('f_icon').value = '';
                            document.getElementById('f_title').value = '';
                            document.getElementById('f_desc').value = '';
                          }}>إضافة ميزة</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave}>
                <i className="fa fa-save me-1"></i> {editingService ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminServices;
