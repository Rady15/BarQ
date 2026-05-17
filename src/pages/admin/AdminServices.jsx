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

  const suggestedIcons = [
    { icon: 'fa-laptop-code', label: 'برمجة' },
    { icon: 'fa-robot', label: 'ذكاء اصطناعي' },
    { icon: 'fa-brain', label: 'تحليل/ذكاء' },
    { icon: 'fa-bolt', label: 'سرعة' },
    { icon: 'fa-cogs', label: 'أتمتة' },
    { icon: 'fa-link', label: 'ربط/تكامل' },
    { icon: 'fa-shield-alt', label: 'أمان' },
    { icon: 'fa-chart-line', label: 'نمو' },
    { icon: 'fa-users', label: 'عملاء' },
    { icon: 'fa-award', label: 'تميز/جائزة' },
    { icon: 'fa-network-wired', label: 'تكامل أنظمة' },
    { icon: 'fa-eye', label: 'رؤية مدركة' },
    { icon: 'fa-landmark', label: 'سوق سعودي' },
    { icon: 'fa-check', label: 'ميزة صح' },
    { icon: 'fa-star', label: 'نجمة' },
    { icon: 'fa-rocket', label: 'إنطلاق' },
    { icon: 'fa-lightbulb', label: 'إبداع' },
    { icon: 'fa-money-bill-wave', label: 'وفر تشغيلي' }
  ];

  const [featureForm, setFeatureForm] = useState({
    id: null,
    title_ar: '',
    title_en: '',
    slogan_ar: '',
    slogan_en: '',
    description_ar: '',
    description_en: '',
    icon: 'fa-check',
    image: '',
    link_url: '',
    section: 'why',
    sort_order: 0
  });

  const [visualType, setVisualType] = useState('icon'); // 'icon' or 'image'

  const resetFeatureForm = () => {
    setFeatureForm({
      id: null,
      title_ar: '',
      title_en: '',
      slogan_ar: '',
      slogan_en: '',
      description_ar: '',
      description_en: '',
      icon: 'fa-check',
      image: '',
      link_url: '',
      section: 'why',
      sort_order: 0
    });
    setVisualType('icon');
  };

  const handleEditFeature = (f) => {
    setFeatureForm({
      id: f.id,
      title_ar: f.title_ar || '',
      title_en: f.title_en || '',
      slogan_ar: f.slogan_ar || '',
      slogan_en: f.slogan_en || '',
      description_ar: f.description_ar || '',
      description_en: f.description_en || '',
      icon: f.icon || 'fa-check',
      image: f.image || '',
      link_url: f.link_url || '',
      section: f.section || 'why',
      sort_order: f.sort_order || 0
    });
    setVisualType(f.image ? 'image' : 'icon');
  };

  const handleSaveFeature = async () => {
    if (!featureForm.title_ar) {
      showError('خطأ', 'يرجى إدخال عنوان الكارت بالعربية');
      return;
    }
    
    const data = {
      ...featureForm,
      icon: visualType === 'icon' ? featureForm.icon : '',
      image: visualType === 'image' ? featureForm.image : ''
    };

    try {
      if (featureForm.id) {
        await api.put(`/services/features/${featureForm.id}`, data);
        showSuccess('تم التحديث', 'تم تحديث الكارت بنجاح');
      } else {
        await api.post(`/services/${editingService.id}/features`, data);
        showSuccess('تمت الإضافة', 'تمت إضافة الكارت بنجاح');
      }
      
      const updated = await api.get(`/services/${editingService.id}`);
      setEditingService(updated);
      resetFeatureForm();
    } catch (err) {
      showError('خطأ', err.message);
    }
  };

  const handleDeleteFeature = async (id) => {
    const confirmDelete = await showConfirm('حذف الكارت', 'هل أنت متأكد من حذف هذا الكارت بالكامل؟');
    if (confirmDelete.isConfirmed) {
      try {
        await api.delete(`/services/features/${id}`);
        const updated = await api.get(`/services/${editingService.id}`);
        setEditingService(updated);
        showSuccess('تم الحذف', 'تم حذف الكارت بنجاح');
      } catch (err) {
        showError('خطأ', err.message);
      }
    }
  };

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
    resetFeatureForm();
    setShowModal(true);
  };

  const handleEdit = async (service) => {
    try {
      const fullService = await api.get(`/services/${service.id}`);
      setEditingService(fullService);
      setForm({
        title_ar: fullService.title_ar, title_en: fullService.title_en || '',
        icon: fullService.icon || '', icon_image: fullService.icon_image || '',
        description_ar: fullService.description_ar || '', description_en: fullService.description_en || '',
        excerpt_ar: fullService.excerpt_ar || '', excerpt_en: fullService.excerpt_en || '',
        image: fullService.image || '', is_active: fullService.is_active
      });
    } catch (err) {
      console.error('Error fetching full service details:', err);
      setEditingService(service);
      setForm({
        title_ar: service.title_ar, title_en: service.title_en || '',
        icon: service.icon || '', icon_image: service.icon_image || '',
        description_ar: service.description_ar || '', description_en: service.description_en || '',
        excerpt_ar: service.excerpt_ar || '', excerpt_en: service.excerpt_en || '',
        image: service.image || '', is_active: service.is_active
      });
    }
    resetFeatureForm();
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
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  {!editingService ? (
                    <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center', margin: '10px 0' }}>
                      <i className="fa fa-info-circle me-1"></i> يرجى حفظ الخدمة أولاً لكي تتمكن من إضافة وتعديل كروت المميزات.
                    </p>
                  ) : (
                    <>
                      {/* Grid of existing cards */}
                      <div className="mb-4">
                        <label className="fw-bold mb-2 text-dark" style={{ fontSize: '0.85rem' }}>الكروت المضافة حالياً ({editingService.features?.length || 0})</label>
                        {(!editingService.features || editingService.features.length === 0) ? (
                          <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '20px', textAlign: 'center', background: 'white' }}>
                            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>لا توجد كروت مضافة لهذه الخدمة بعد. استخدم النموذج أدناه لإضافة كروت.</p>
                          </div>
                        ) : (
                          <div className="row g-2" style={{ maxHeight: '280px', overflowY: 'auto', padding: '2px' }}>
                            {editingService.features.map(f => (
                              <div className="col-md-6" key={f.id}>
                                <div style={{ 
                                  background: 'white', 
                                  border: featureForm.id === f.id ? '2px solid #082e71' : '1px solid #e2e8f0',
                                  borderRadius: '12px', 
                                  padding: '12px',
                                  position: 'relative',
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                  display: 'flex',
                                  gap: '12px',
                                  alignItems: 'center'
                                }}>
                                  <div style={{ 
                                    width: '45px', 
                                    height: '45px', 
                                    background: '#f1f5f9', 
                                    borderRadius: '8px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    flexShrink: 0
                                  }}>
                                    {f.image ? (
                                      <img src={getImageUrl(f.image)} alt="" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '4px', objectFit: 'contain' }} />
                                    ) : (
                                      <i className={`fa ${f.icon || 'fa-check'} text-primary fa-lg`}></i>
                                    )}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="d-flex align-items-center gap-1">
                                      <span className={`badge ${f.section === 'why' ? 'bg-primary' : 'bg-success'}`} style={{ fontSize: '0.65rem', padding: '3px 6px' }}>
                                        {f.section === 'why' ? 'الأهمية' : 'الفرق'}
                                      </span>
                                      {f.slogan_ar && (
                                        <span className="badge bg-warning text-dark" style={{ fontSize: '0.65rem', padding: '3px 6px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '80px' }}>
                                          {f.slogan_ar}
                                        </span>
                                      )}
                                    </div>
                                    <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.85rem', marginTop: '4px' }}>{f.title_ar}</div>
                                    <div className="text-muted small text-truncate" style={{ fontSize: '0.75rem' }}>{f.description_ar}</div>
                                  </div>
                                  <div className="d-flex flex-column gap-1" style={{ flexShrink: 0 }}>
                                    <button 
                                      type="button" 
                                      className="btn-admin warning btn-admin-sm" 
                                      onClick={() => handleEditFeature(f)}
                                      style={{ padding: '4px 8px', minWidth: 'auto' }}
                                      title="تعديل"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </button>
                                    <button 
                                      type="button" 
                                      className="btn-admin danger btn-admin-sm" 
                                      onClick={() => handleDeleteFeature(f.id)}
                                      style={{ padding: '4px 8px', minWidth: 'auto' }}
                                      title="حذف"
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Addition / Edition Form */}
                      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
                        <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                          <h6 style={{ fontWeight: 700, color: '#082e71', margin: 0, fontSize: '0.9rem' }}>
                            {featureForm.id ? '✏️ تعديل بيانات الكارت' : '➕ إضافة كارت جديد (أهمية / فرق / ميزة)'}
                          </h6>
                          {featureForm.id && (
                            <button 
                              type="button" 
                              className="btn-admin outline btn-admin-sm" 
                              onClick={resetFeatureForm}
                              style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                            >
                              إلغاء التعديل
                            </button>
                          )}
                        </div>

                        <div className="row g-3">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>القسم / التبويب</label>
                              <select 
                                value={featureForm.section} 
                                onChange={e => setFeatureForm({...featureForm, section: e.target.value})} 
                                className="form-select form-select-sm"
                              >
                                <option value="why">الأهمية (لماذا يمثل أهمية؟)</option>
                                <option value="how">الفرق / الميزة (كيف نصنع الفارق؟)</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="col-md-4">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>العنوان (عربي) *</label>
                              <input 
                                value={featureForm.title_ar} 
                                onChange={e => setFeatureForm({...featureForm, title_ar: e.target.value})} 
                                className="form-control form-control-sm"
                                placeholder="مثال: السرعة الفائقة"
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>العنوان (إنجليزي)</label>
                              <input 
                                value={featureForm.title_en} 
                                onChange={e => setFeatureForm({...featureForm, title_en: e.target.value})} 
                                className="form-control form-control-sm"
                                placeholder="e.g. Ultra Speed"
                                dir="ltr"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row g-3 mt-1">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>سلوجان / شارة (عربي)</label>
                              <input 
                                value={featureForm.slogan_ar} 
                                onChange={e => setFeatureForm({...featureForm, slogan_ar: e.target.value})} 
                                className="form-control form-control-sm"
                                placeholder="مثال: حصري، جديد"
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>سلوجان / شارة (إنجليزي)</label>
                              <input 
                                value={featureForm.slogan_en} 
                                onChange={e => setFeatureForm({...featureForm, slogan_en: e.target.value})} 
                                className="form-control form-control-sm"
                                placeholder="e.g. Exclusive, New"
                                dir="ltr"
                              />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>رابط مخصص في الكارت (اختياري)</label>
                              <input 
                                value={featureForm.link_url} 
                                onChange={e => setFeatureForm({...featureForm, link_url: e.target.value})} 
                                className="form-control form-control-sm"
                                placeholder="https://... أو /service/..."
                                dir="ltr"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row g-3 mt-1">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>الوصف التفصيلي (عربي)</label>
                              <textarea 
                                value={featureForm.description_ar} 
                                onChange={e => setFeatureForm({...featureForm, description_ar: e.target.value})} 
                                className="form-control form-control-sm"
                                placeholder="اكتب وصف الكارت باللغة العربية..."
                                rows="2"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>الوصف التفصيلي (إنجليزي)</label>
                              <textarea 
                                value={featureForm.description_en} 
                                onChange={e => setFeatureForm({...featureForm, description_en: e.target.value})} 
                                className="form-control form-control-sm"
                                placeholder="Write the card description in English..."
                                rows="2"
                                dir="ltr"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Visual Choice: Icon or Image */}
                        <div className="mt-3 border-top pt-3">
                          <label className="fw-bold mb-2 text-dark" style={{ fontSize: '0.8rem' }}>مظهر الكارت البصري</label>
                          <div className="d-flex gap-3 mb-3">
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="visualType" 
                                id="visualIcon" 
                                value="icon"
                                checked={visualType === 'icon'} 
                                onChange={() => setVisualType('icon')} 
                              />
                              <label className="form-check-label ms-1 me-1" htmlFor="visualIcon" style={{ fontSize: '0.8rem' }}>أيقونة FontAwesome</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name="visualType" 
                                id="visualImage" 
                                value="image"
                                checked={visualType === 'image'} 
                                onChange={() => setVisualType('image')} 
                              />
                              <label className="form-check-label ms-1 me-1" htmlFor="visualImage" style={{ fontSize: '0.8rem' }}>صورة مخصصة (رفع أو رابط)</label>
                            </div>
                          </div>

                          {visualType === 'icon' ? (
                            <div>
                              <div className="form-group mb-2">
                                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>اسم كود الأيقونة</label>
                                <input 
                                  value={featureForm.icon} 
                                  onChange={e => setFeatureForm({...featureForm, icon: e.target.value})} 
                                  className="form-control form-control-sm"
                                  placeholder="e.g. fa-laptop-code"
                                  dir="ltr"
                                />
                              </div>
                              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }} className="mb-2">💡 اضغط على الأيقونة للترشيح المباشر:</label>
                              <div className="d-flex flex-wrap gap-1 p-2 bg-light rounded-3" style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                {suggestedIcons.map(item => (
                                  <button 
                                    key={item.icon}
                                    type="button"
                                    onClick={() => setFeatureForm({...featureForm, icon: item.icon})}
                                    style={{
                                      background: featureForm.icon === item.icon ? '#082e71' : 'white',
                                      color: featureForm.icon === item.icon ? 'white' : '#082e71',
                                      border: '1px solid #cbd5e1',
                                      borderRadius: '6px',
                                      padding: '4px 8px',
                                      fontSize: '0.7rem',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '5px',
                                      cursor: 'pointer'
                                    }}
                                    title={item.label}
                                  >
                                    <i className={`fa ${item.icon}`}></i>
                                    <span>{item.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <ImageUploader 
                              label="رفع أو اختيار رابط الصورة"
                              value={featureForm.image}
                              onChange={val => setFeatureForm({...featureForm, image: val})}
                            />
                          )}
                        </div>

                        <div className="mt-3 text-start">
                          <button 
                            type="button" 
                            className="btn-admin primary btn-admin-sm" 
                            onClick={handleSaveFeature}
                            style={{ padding: '8px 20px' }}
                          >
                            <i className={`fa ${featureForm.id ? 'fa-save' : 'fa-plus'} me-1 ms-1`}></i>
                            {featureForm.id ? 'حفظ تعديلات الكارت' : 'إضافة الكارت للخدمة'}
                          </button>
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
