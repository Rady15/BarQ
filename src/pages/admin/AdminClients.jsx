import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import { api, getImageUrl } from '../../utils/api';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form, setForm] = useState({ name: '', name_en: '', logo: '', type: 'client', is_active: 1 });

  const fetchClients = async () => {
    try {
      const data = await api.get('/clients');
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAdd = () => {
    setEditingClient(null);
    setForm({ name: '', name_en: '', logo: '', type: 'client', is_active: 1 });
    setShowModal(true);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setForm({ 
      name: client.name, 
      name_en: client.name_en || '', 
      logo: client.logo || '', 
      type: client.type || 'client',
      is_active: client.is_active
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingClient) {
        await api.put(`/clients/${editingClient.id}`, form);
      } else {
        await api.post('/clients', form);
      }
      setShowModal(false);
      fetchClients();
    } catch (err) {
      alert('خطأ: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العميل/الشريك؟')) {
      try {
        await api.delete(`/clients/${id}`);
        fetchClients();
      } catch (err) {
        alert('خطأ: ' + err.message);
      }
    }
  };

  return (
    <AdminLayout pageTitle="إدارة العملاء والشركاء">
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-handshake me-2"></i>العملاء والشركاء ({clients.length})</h5>
          <button className="btn-admin primary" onClick={handleAdd}>
            <i className="fa fa-plus"></i> إضافة عميل/شريك
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>الشعار</th>
                <th>الاسم</th>
                <th>النوع</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => (
                <tr key={client.id}>
                  <td>{i + 1}</td>
                  <td>
                    {client.logo ? (
                      <img src={getImageUrl(client.logo)} alt={client.name} style={{ height: '40px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }} />
                    ) : (
                      <div style={{ height: '40px', width: '60px', borderRadius: '6px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa fa-image" style={{ color: '#d1d5db' }}></i>
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{client.name}</td>
                  <td>{client.type === 'partner' ? 'شريك' : 'عميل'}</td>
                  <td><span className="admin-badge active">{client.is_active ? 'مفعّل' : 'معطّل'}</span></td>
                  <td>
                    <button className="btn-admin warning btn-admin-sm me-2" onClick={() => handleEdit(client)}>
                      <i className="fa fa-edit"></i>
                    </button>
                    <button className="btn-admin danger btn-admin-sm" onClick={() => handleDelete(client.id)}>
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
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5>{editingClient ? 'تعديل' : 'إضافة عميل/شريك'}</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>الاسم</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="اسم العميل أو الشريك" />
              </div>

              <ImageUploader
                label="شعار العميل/الشريك"
                value={form.logo}
                onChange={val => setForm({...form, logo: val})}
              />

              <div className="form-group">
                <label>النوع</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="client">عميل</option>
                  <option value="partner">شريك</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave}>
                <i className="fa fa-save me-1"></i> {editingClient ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminClients;
