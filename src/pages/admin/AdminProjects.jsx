import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import { api, getImageUrl } from '../../utils/api';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'advanced', 'features'
  
  const [form, setForm] = useState({
    title_ar: '',
    title_en: '',
    client_name: '',
    description_ar: '',
    description_en: '',
    image: '',
    status: 'draft',
    category: '',
    sector_ar: '',
    sector_en: '',
    value_ar: '',
    value_en: '',
    impact_metric: '',
    impact_label_ar: '',
    impact_label_en: '',
    features_json: '[]'
  });

  // Features list manager state
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({
    titleAr: '',
    titleEn: '',
    icon: 'fa-check',
    descAr: '',
    descEn: ''
  });
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);

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
    setActiveTab('basic');
    setFeatures([]);
    setNewFeature({ titleAr: '', titleEn: '', icon: 'fa-check', descAr: '', descEn: '' });
    setEditingFeatureIndex(null);
    setForm({
      title_ar: '',
      title_en: '',
      client_name: '',
      description_ar: '',
      description_en: '',
      image: '',
      status: 'draft',
      category: '',
      sector_ar: '',
      sector_en: '',
      value_ar: '',
      value_en: '',
      impact_metric: '',
      impact_label_ar: '',
      impact_label_en: '',
      features_json: '[]'
    });
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setActiveTab('basic');
    
    let parsedFeatures = [];
    try {
      parsedFeatures = JSON.parse(project.features_json || '[]');
    } catch (e) {
      parsedFeatures = [];
    }
    setFeatures(parsedFeatures);
    setNewFeature({ titleAr: '', titleEn: '', icon: 'fa-check', descAr: '', descEn: '' });
    setEditingFeatureIndex(null);

    setForm({
      title_ar: project.title_ar,
      title_en: project.title_en || '',
      client_name: project.client_name || '',
      description_ar: project.description_ar || '',
      description_en: project.description_en || '',
      image: project.image || '',
      status: project.status,
      category: project.category || '',
      sector_ar: project.sector_ar || '',
      sector_en: project.sector_en || '',
      value_ar: project.value_ar || '',
      value_en: project.value_en || '',
      impact_metric: project.impact_metric || '',
      impact_label_ar: project.impact_label_ar || '',
      impact_label_en: project.impact_label_en || '',
      features_json: project.features_json || '[]'
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        features_json: JSON.stringify(features)
      };

      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, payload);
        showSuccess('تم التحديث', 'تم تحديث بيانات المشروع بنجاح');
      } else {
        await api.post('/projects', payload);
        showSuccess('تمت الإضافة', 'تمت إضافة المشروع الجديد بنجاح');
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      showError('خطأ', err.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('حذف المشروع', 'هل أنت متأكد من حذف هذا المشروع نهائياً؟');
    if (result.isConfirmed) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
        showSuccess('تم الحذف', 'تم حذف المشروع بنجاح');
      } catch (err) {
        showError('خطأ', err.message);
      }
    }
  };

  // Feature operations
  const handleAddFeature = () => {
    if (!newFeature.titleAr && !newFeature.titleEn) {
      showError('تنبيه', 'يجب إدخال عنوان الكارت باللغة العربية أو الإنجليزية');
      return;
    }
    if (editingFeatureIndex !== null) {
      const updated = [...features];
      updated[editingFeatureIndex] = newFeature;
      setFeatures(updated);
      setEditingFeatureIndex(null);
    } else {
      setFeatures([...features, newFeature]);
    }
    setNewFeature({ titleAr: '', titleEn: '', icon: 'fa-check', descAr: '', descEn: '' });
  };

  const handleEditFeature = (index) => {
    setNewFeature(features[index]);
    setEditingFeatureIndex(index);
  };

  const handleDeleteFeature = (index) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
    if (editingFeatureIndex === index) {
      setEditingFeatureIndex(null);
      setNewFeature({ titleAr: '', titleEn: '', icon: 'fa-check', descAr: '', descEn: '' });
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
                <th>القطاع</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr key={project.id}>
                  <td>{i + 1}</td>
                  <td>
                    <img 
                      src={project.image ? getImageUrl(project.image) : "/img/prjects.png"} 
                      alt={project.title_ar} 
                      style={{ height: '45px', width: '65px', borderRadius: '6px', objectFit: 'cover' }} 
                    />
                  </td>
                  <td style={{ fontWeight: 600 }}>{project.title_ar}</td>
                  <td style={{ color: '#6b7280' }}>{project.client_name}</td>
                  <td style={{ color: '#0dcaf0', fontSize: '0.85rem' }}>{project.sector_ar || 'غير محدد'}</td>
                  <td>
                    <span className={`admin-badge ${project.status}`}>
                      {project.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-admin warning btn-admin-sm me-2 ms-2" onClick={() => handleEdit(project)}>
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
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '850px', width: '95%' }}>
            <div className="modal-header">
              <h5>{editingProject ? `تعديل المشروع: ${editingProject.title_ar}` : 'إضافة مشروع جديد'}</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            
            {/* Modal Tabs Navigation */}
            <div className="d-flex border-bottom bg-light px-3 py-2">
              <button 
                type="button"
                className={`btn btn-sm me-2 ms-2 rounded-pill px-3 py-2 ${activeTab === 'basic' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveTab('basic')}
              >
                <i className="fa fa-info-circle me-1"></i> البيانات الأساسية
              </button>
              <button 
                type="button"
                className={`btn btn-sm me-2 ms-2 rounded-pill px-3 py-2 ${activeTab === 'advanced' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveTab('advanced')}
              >
                <i className="fa fa-sliders-h me-1"></i> الأداء والقطاع (الصفحة الداخلية)
              </button>
              <button 
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-2 ${activeTab === 'features' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveTab('features')}
              >
                <i className="fa fa-th-large me-1"></i> كروت الخدمات والتفاصيل ({features.length})
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="tab-pane active fade show">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>اسم المشروع (عربي)</label>
                        <input value={form.title_ar} onChange={e => setForm({...form, title_ar: e.target.value})} placeholder="مثال: نظام كعك بلادي" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>اسم المشروع (إنجليزي)</label>
                        <input value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} placeholder="e.g. Kaak Biladi ERP" dir="ltr" />
                      </div>
                    </div>
                  </div>
                  <div className="row g-3 mt-1">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>اسم العميل</label>
                        <input value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} placeholder="اسم الشركة أو العميل" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>التصنيف الرئيس</label>
                        <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="مثال: ERP & POS Systems" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <ImageUploader
                      label="صورة المشروع"
                      value={form.image}
                      onChange={val => setForm({...form, image: val})}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label>وصف المشروع (عربي)</label>
                    <textarea rows="3" value={form.description_ar} onChange={e => setForm({...form, description_ar: e.target.value})} placeholder="نبذة عامة مختصرة للمشروع بالعربية..." />
                  </div>
                  <div className="form-group mt-2">
                    <label>وصف المشروع (إنجليزي)</label>
                    <textarea rows="3" value={form.description_en} onChange={e => setForm({...form, description_en: e.target.value})} placeholder="Short summary description in English..." dir="ltr" />
                  </div>
                  <div className="form-group mt-2">
                    <label>الحالة</label>
                    <select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                      <option value="draft">مسودة</option>
                      <option value="published">منشور</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 2: ADVANCED SECTORS & METRICS */}
              {activeTab === 'advanced' && (
                <div className="tab-pane active fade show">
                  <div className="bg-light p-3 rounded mb-3">
                    <h6 className="text-primary mb-2"><i className="fa fa-info me-2 ms-2"></i>معلومات الصفحة الداخلية الخاصة بالمشروع</h6>
                    <small className="text-muted">هذه الحقول تظهر فقط عندما يقوم العميل بالنقر على المشروع لعرض تفاصيله الكاملة.</small>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>قطاع الأعمال (عربي)</label>
                        <input value={form.sector_ar} onChange={e => setForm({...form, sector_ar: e.target.value})} placeholder="مثال: المخابز وصناعة الحلويات" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>قطاع الأعمال (إنجليزي)</label>
                        <input value={form.sector_en} onChange={e => setForm({...form, sector_en: e.target.value})} placeholder="e.g. Sweets & Bakeries" dir="ltr" />
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 mt-1">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>نسبة التأثير أو القيمة المحققة (Impact Metric)</label>
                        <input value={form.impact_metric} onChange={e => setForm({...form, impact_metric: e.target.value})} placeholder="مثال: 35% أو 99.9%" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>توصيف النسبة (عربي)</label>
                        <input value={form.impact_label_ar} onChange={e => setForm({...form, impact_label_ar: e.target.value})} placeholder="مثال: تقليص في الهدر التشغيلي" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>توصيف النسبة (إنجليزي)</label>
                        <input value={form.impact_label_en} onChange={e => setForm({...form, impact_label_en: e.target.value})} placeholder="e.g. Reduction in waste" dir="ltr" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <label>القيمة المضافة للمشروع (عربي)</label>
                    <textarea rows="3" value={form.value_ar} onChange={e => setForm({...form, value_ar: e.target.value})} placeholder="مثال: ساهم المشروع في تقليل المجهود البشري وتتبع صلاحيات الأغذية ورفع دقة التقارير..." />
                  </div>
                  <div className="form-group mt-2">
                    <label>القيمة المضافة للمشروع (إنجليزي)</label>
                    <textarea rows="3" value={form.value_en} onChange={e => setForm({...form, value_en: e.target.value})} placeholder="Value Added description in English..." dir="ltr" />
                  </div>
                </div>
              )}

              {/* TAB 3: FEATURES & DETAILED CARDS BUILDER */}
              {activeTab === 'features' && (
                <div className="tab-pane active fade show">
                  <div className="bg-light p-3 rounded mb-3">
                    <h6 className="text-primary mb-1"><i className="fa fa-th me-2 ms-2"></i>منشئ كروت تفاصيل الخدمات والميزات</h6>
                    <small className="text-muted">أضف الكروت والمقاطع التي يتألف منها هذا النظام ليتمكن العملاء من استعراضها بشكل كروت تفاعلية رائعة.</small>
                  </div>

                  {/* Card Entry Form */}
                  <div className="card border p-3 mb-3 bg-white">
                    <span className="badge bg-secondary mb-2 align-self-start">
                      {editingFeatureIndex !== null ? `تعديل كارت رقم ${editingFeatureIndex + 1}` : 'إضافة كارت جديد'}
                    </span>
                    <div className="row g-2">
                      <div className="col-md-5">
                        <div className="form-group">
                          <label className="small mb-1">اسم الكارت / الخدمة (عربي)</label>
                          <input 
                            className="form-control form-control-sm"
                            value={newFeature.titleAr} 
                            onChange={e => setNewFeature({...newFeature, titleAr: e.target.value})} 
                            placeholder="مثال: المبيعات (Sales)" 
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group">
                          <label className="small mb-1">اسم الكارت / الخدمة (إنجليزي)</label>
                          <input 
                            className="form-control form-control-sm"
                            value={newFeature.titleEn} 
                            onChange={e => setNewFeature({...newFeature, titleEn: e.target.value})} 
                            placeholder="e.g. Sales Management" 
                            dir="ltr"
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <label className="small mb-1">أيقونة FA</label>
                          <input 
                            className="form-control form-control-sm"
                            value={newFeature.icon} 
                            onChange={e => setNewFeature({...newFeature, icon: e.target.value})} 
                            placeholder="e.g. fa-warehouse" 
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row g-2 mt-1">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="small mb-1">شرح موجز للكارت (عربي)</label>
                          <textarea 
                            className="form-control form-control-sm"
                            rows="2"
                            value={newFeature.descAr} 
                            onChange={e => setNewFeature({...newFeature, descAr: e.target.value})} 
                            placeholder="شرح موجز لما يغطيه هذا الكارت بالعربية..." 
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="small mb-1">شرح موجز للكارت (إنجليزي)</label>
                          <textarea 
                            className="form-control form-control-sm"
                            rows="2"
                            value={newFeature.descEn} 
                            onChange={e => setNewFeature({...newFeature, descEn: e.target.value})} 
                            placeholder="Short description in English..." 
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                      <button type="button" className="btn btn-sm btn-primary px-4 py-2" onClick={handleAddFeature}>
                        <i className="fa fa-plus me-1"></i> {editingFeatureIndex !== null ? 'تحديث الكارت' : 'إضافة الكارت للائحة'}
                      </button>
                      {editingFeatureIndex !== null && (
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-secondary" 
                          onClick={() => {
                            setEditingFeatureIndex(null);
                            setNewFeature({ titleAr: '', titleEn: '', icon: 'fa-check', descAr: '', descEn: '' });
                          }}
                        >
                          إلغاء التعديل
                        </button>
                      )}
                    </div>
                  </div>

                  {/* List of current cards */}
                  <h6 className="border-bottom pb-2">الكروت المضافة حالياً ({features.length})</h6>
                  {features.length === 0 ? (
                    <div className="text-center text-muted p-4 border rounded bg-white">
                      <i className="fa fa-info-circle fa-2x mb-2 text-muted"></i>
                      <p className="mb-0">لا توجد كروت خدمات مضافة لهذا المشروع حتى الآن.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped align-middle bg-white table-sm" style={{ fontSize: '0.85rem' }}>
                        <thead>
                          <tr className="bg-light">
                            <th style={{ width: '40px' }}>#</th>
                            <th style={{ width: '60px' }}>الأيقونة</th>
                            <th>العنوان (عربي / إنجليزي)</th>
                            <th>الشرح (عربي / إنجليزي)</th>
                            <th style={{ width: '100px' }}>إجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {features.map((feat, idx) => (
                            <tr key={idx}>
                              <td className="text-center fw-bold">{idx + 1}</td>
                              <td className="text-center">
                                <span className="bg-primary-transparent p-2 rounded d-inline-block">
                                  <i className={`fa ${feat.icon || 'fa-check'} text-primary`}></i>
                                </span>
                              </td>
                              <td>
                                <strong className="d-block">{feat.titleAr}</strong>
                                <span className="text-muted small">{feat.titleEn}</span>
                              </td>
                              <td>
                                <span className="d-block mb-1">{feat.descAr}</span>
                                <span className="text-muted small d-block">{feat.descEn}</span>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className="btn btn-sm btn-outline-warning me-1 ms-1"
                                  onClick={() => handleEditFeature(idx)}
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button 
                                  type="button" 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteFeature(idx)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <div className="me-auto text-muted small">
                {activeTab === 'basic' && <span>الخطوة 1 من 3</span>}
                {activeTab === 'advanced' && <span>الخطوة 2 من 3</span>}
                {activeTab === 'features' && <span>الخطوة 3 من 3</span>}
              </div>
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave}>
                <i className="fa fa-save me-1"></i> حفظ وحفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjects;
