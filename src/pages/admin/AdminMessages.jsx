import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await api.get('/messages');
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try {
      await api.delete(`/messages/${id}`);
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <AdminLayout title="إدارة الرسائل والطلبات">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa fa-envelope-open fa-3x text-muted mb-3"></i>
              <p className="text-muted">لا يوجد رسائل أو طلبات حالياً</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>التاريخ</th>
                    <th>المرسل</th>
                    <th>الموضوع / الخدمة</th>
                    <th>الرسالة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id}>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {new Date(msg.created_at).toLocaleDateString('ar-SA')}
                      </td>
                      <td>
                        <div className="fw-bold">{msg.name}</div>
                        <div className="small text-muted">{msg.email}</div>
                        <div className="small text-primary">{msg.phone}</div>
                      </td>
                      <td>
                        <span className={`badge ${msg.subject?.includes('طلب خدمة') ? 'bg-success' : 'bg-info'}`}>
                          {msg.subject}
                        </span>
                      </td>
                      <td>
                        <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {msg.message}
                        </div>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(msg.id)}
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
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
