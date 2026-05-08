import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api, getImageUrl } from '../../utils/api';

const AdminMedia = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    try {
      const data = await api.get('/media');
      setMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const copyUrl = (url) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    alert('تم نسخ الرابط بنجاح');
  };

  return (
    <AdminLayout pageTitle="مكتبة الوسائط">
      <div className="admin-table-card">
        <div className="card-header">
          <h5><i className="fa fa-photo-video me-2"></i>جميع الملفات المرفوعة</h5>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="text-center py-5">جاري التحميل...</div>
          ) : (
            <div className="row g-3">
              {media.map(file => (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={file.id}>
                  <div className="media-card" style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      aspectRatio: '1/1',
                      background: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      {file.mime_type.startsWith('image/') ? (
                        <img src={getImageUrl(file.path)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <i className="fa fa-file-alt fa-3x text-muted"></i>
                      )}
                    </div>
                    <div className="p-2 small" style={{ flex: 1 }}>
                      <div className="text-truncate mb-2 fw-bold" title={file.original_name}>{file.original_name}</div>
                      <div className="d-flex gap-1">
                        <button className="btn-admin outline btn-admin-sm w-100" onClick={() => copyUrl(file.path)}>
                          <i className="fa fa-copy"></i>
                        </button>
                        <a href={getImageUrl(file.path)} target="_blank" rel="noreferrer" className="btn-admin outline btn-admin-sm w-100">
                          <i className="fa fa-external-link-alt"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
