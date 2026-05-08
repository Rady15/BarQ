import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange, placeholder, label }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleChange = (content, delta, source, editor) => {
    if (onChange && source === 'user') {
      onChange(content);
    }
  };

  return (
    <div className="form-group mb-4">
      {label && <label className="mb-2 d-block fw-bold">{label}</label>}
      <ReactQuill 
        theme="snow"
        value={value || ''}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: '250px', marginBottom: '50px' }}
      />
      <style>{`
        .ql-container {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          font-family: 'Inter', 'Cairo', sans-serif;
        }
        .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background: #f9fafb;
        }
        .ql-editor {
          min-height: 200px;
          font-size: 1rem;
          text-align: right;
        }
        [dir="ltr"] .ql-editor {
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
