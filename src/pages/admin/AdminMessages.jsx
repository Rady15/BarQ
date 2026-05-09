import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';
import { showSuccess, showError, showConfirm } from '../../utils/alerts';

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
      await api.post('/messages/reply', {
        message_id: replyingTo.id, // ربط الرد بالرسالة
        email: replyingTo.email,
        subject: replySubject,
        message: replyMessage
      });
      showSuccess('تم إرسال الرد', 'تم إرسال الإيميل وحفظ النسخة في السجل بنجاح');
      setReplyingTo(null);
      setReplySubject('');
      setReplyMessage('');
      fetchMessages(); // تحديث القائمة لرؤية الرد الجديد
    } catch (err) {
      showError('فشل الإرسال', 'حدث خطأ أثناء إرسال الإيميل');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await showConfirm('حذف الرسالة', 'هل أنت متأكد من حذف هذه الرسالة؟');
    if (result.isConfirmed) {
      try {
        await api.delete(`/messages/${id}`);
        showSuccess('تم الحذف', 'تم حذف الرسالة بنجاح');
        setMessages(messages.filter(m => m.id !== id));
      } catch (err) {
        showError('خطأ', 'حدث خطأ أثناء الحذف');
      }
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
                        <div className="fw-bold">{msg.subject || 'بدون عنوان'}</div>
                        <div className="small text-muted text-truncate" style={{ maxWidth: '300px' }}>
                          {msg.message}
                        </div>
                        {/* عرض الردود السابقة */}
                        {msg.replies && msg.replies.length > 0 && (
                          <div className="mt-2 pt-2 border-top">
                            <div className="small fw-bold text-primary mb-1">الردود السابقة:</div>
                            {msg.replies.map((reply, rid) => (
                              <div key={rid} className="bg-light p-2 rounded mb-1 small border-start border-primary border-3">
                                <div className="d-flex justify-content-between">
                                  <span className="fw-bold">{reply.subject}</span>
                                  <span className="text-muted" style={{fontSize: '10px'}}>{new Date(reply.created_at).toLocaleDateString('ar-EG')}</span>
                                </div>
                                <div className="text-dark">{reply.message}</div>
                              </div>
                            ))}
                          </div>
                        )}
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
