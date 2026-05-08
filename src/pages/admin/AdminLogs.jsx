import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../utils/api';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await api.get('/system/logs');
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <AdminLayout pageTitle="سجل أخطاء النظام">
      <div className="admin-table-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5><i className="fa fa-exclamation-triangle me-2 text-danger"></i>الأخطاء والتحذيرات</h5>
          <span className="badge bg-danger">{logs.length} خطأ مسجل</span>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>التاريخ</th>
                <th>المسار</th>
                <th>الرسالة</th>
                <th>التفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center py-5">جاري التحميل...</td></tr>
              ) : logs.length > 0 ? (
                logs.map(log => (
                  <tr key={log.id}>
                    <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      {new Date(log.created_at).toLocaleString('ar-EG')}
                    </td>
                    <td>
                      <span className="badge bg-light text-dark me-1">{log.method}</span>
                      <code>{log.path}</code>
                    </td>
                    <td className="text-danger fw-bold" style={{ maxWidth: '300px' }}>{log.message}</td>
                    <td>
                      <button className="btn-admin outline btn-admin-sm" onClick={() => alert(log.stack)}>
                        <i className="fa fa-code me-1"></i> عرض الـ Stack
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center py-5 text-muted">لا توجد أخطاء مسجلة حالياً 🎉</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminLogs;
