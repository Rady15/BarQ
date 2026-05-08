import React, { useRef, useState } from 'react';

const ImageUploader = ({ label, value, onChange, accept = 'image/*' }) => {
  const fileRef = useRef(null);
  const [mode, setMode] = useState('url'); // 'url' or 'upload'
  const [preview, setPreview] = useState(value || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Show a temporary preview or loading state
    setPreview(URL.createObjectURL(file));
    
    try {
      const { api, getImageUrl } = await import('../../utils/api');
      const data = await api.upload(file);
      setPreview(getImageUrl(data.url));
      onChange(data.url);
    } catch (err) {
      alert('فشل رفع الملف: ' + err.message);
      setPreview('');
    }
  };

  const handleUrlChange = (url) => {
    setPreview(url);
    onChange(url);
  };


  return (
    <div className="form-group">
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <button
          type="button"
          className={`btn-admin btn-admin-sm ${mode === 'url' ? 'primary' : 'outline'}`}
          onClick={() => setMode('url')}
        >
          <i className="fa fa-link me-1"></i> رابط
        </button>
        <button
          type="button"
          className={`btn-admin btn-admin-sm ${mode === 'upload' ? 'primary' : 'outline'}`}
          onClick={() => setMode('upload')}
        >
          <i className="fa fa-upload me-1"></i> رفع ملف
        </button>
      </div>

      {mode === 'url' ? (
        <input
          value={value || ''}
          onChange={e => handleUrlChange(e.target.value)}
          placeholder="https://... أو /img/..."
          dir="ltr"
        />
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: '10px',
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: '#f9fafb',
            transition: 'all 0.3s ease'
          }}
          onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = '#082e71'; }}
          onDragLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; }}
          onDrop={async e => {
            e.preventDefault();
            e.currentTarget.style.borderColor = '#d1d5db';
            const file = e.dataTransfer.files[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
              try {
                const { api, getImageUrl } = await import('../../utils/api');
                const data = await api.upload(file);
                setPreview(getImageUrl(data.url));
                onChange(data.url);
              } catch (err) {
                alert('فشل رفع الملف: ' + err.message);
                setPreview('');
              }
            }
          }}
        >
          <i className="fa fa-cloud-upload-alt" style={{ fontSize: '2rem', color: '#9ca3af', marginBottom: '8px', display: 'block' }}></i>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.85rem' }}>
            اضغط أو اسحب الملف هنا
          </p>
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {preview && (
        <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxHeight: '80px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <button
            type="button"
            onClick={() => { setPreview(''); onChange(''); }}
            style={{
              position: 'absolute', top: '-6px', right: '-6px',
              background: '#ef4444', color: '#fff', border: 'none',
              borderRadius: '50%', width: '22px', height: '22px',
              fontSize: '0.7rem', cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}
          >✕</button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
