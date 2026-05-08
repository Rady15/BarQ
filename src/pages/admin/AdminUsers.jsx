import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../utils/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });

  const fetchUsers = async () => {
    try {
      const data = await api.get('/users');
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', password: '', role: 'admin' });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        // Edit logic if needed, but for now we just add
      } else {
        await api.post('/users', form);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      alert('خطأ: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        alert('خطأ: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  return (
    <AdminLayout pageTitle="إدارة المستخدمين والمديرين">
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-users-cog me-2"></i>مديري النظام</h5>
          <button className="btn-admin primary" onClick={handleAdd}>
            <i className="fa fa-user-plus"></i> إضافة مدير جديد
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>البريد الإلكتروني</th>
                <th>الدور</th>
                <th>تاريخ الانضمام</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ fontWeight: 600 }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="admin-badge info">{user.role}</span></td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className={`admin-badge ${user.is_active ? 'published' : 'draft'}`}>
                      {user.is_active ? 'نشط' : 'معطل'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-admin danger btn-admin-sm" onClick={() => handleDelete(user.id)}>
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
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h5>إضافة مدير جديد</h5>
              <button className="btn-admin outline btn-admin-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>الاسم الكامل</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="أدخل اسم المدير" />
              </div>
              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="example@barqtech.ai" dir="ltr" />
              </div>
              <div className="form-group">
                <label>كلمة المرور</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label>الدور</label>
                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                  <option value="admin">مدير (Admin)</option>
                  <option value="editor">محرر (Editor)</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-admin outline" onClick={() => setShowModal(false)}>إلغاء</button>
              <button className="btn-admin primary" onClick={handleSave}>
                <i className="fa fa-save me-1"></i> حفظ المستخدم
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
