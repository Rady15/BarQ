import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sending, setSending] = useState(false);

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

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await api.post('/messages/reply', {
        email: replyingTo.email,
        subject: replySubject,
        message: replyMessage
      });
      alert(response.message || 'تم إرسال الرد بنجاح');
      setReplyingTo(null);
      setReplySubject('');
      setReplyMessage('');
    } catch (err) {
      alert('حدث خطأ أثناء إرسال الإيميل');
    } finally {
      setSending(false);
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
      {/* Reply Modal */}
      {replyingTo && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white border-0">
                <h5 className="modal-title">الرد على: {replyingTo.name}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setReplyingTo(null)}></button>
              </div>
              <form onSubmit={handleReplySubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold">إلى:</label>
                    <input type="text" className="form-control bg-light" value={replyingTo.email} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">عنوان الرد:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="رد على استفسارك - برق تك"
                      value={replySubject}
                      onChange={(e) => setReplySubject(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">محتوى الرسالة:</label>
                    <textarea 
                      className="form-control" 
                      rows="5" 
                      required
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setReplyingTo(null)}>إلغاء</button>
                  <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={sending}>
                    {sending ? 'جاري الإرسال...' : 'إرسال الرد'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setReplyingTo(msg)}
                            title="رد عبر الإيميل"
                          >
                            <i className="fa fa-reply"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(msg.id)}
                            title="حذف"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
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
