const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000';

console.log('Current API URL:', API_URL);

const getAuthToken = () => {
  const auth = localStorage.getItem('barq_admin_auth');
  if (auth) {
    try {
      const parsed = JSON.parse(auth);
      return parsed.token;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const getHeaders = (isFormData = false) => {
  const headers = {};
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) return `${IMAGE_BASE_URL}${path}`;
  return path;
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData,
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }
};
