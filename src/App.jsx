import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Project from './pages/Project';
import Contact from './pages/Contact';
import WebService from './pages/WebService';
import AiAgentService from './pages/AiAgentService';
import AutomationService from './pages/AutomationService';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import GenericService from './pages/GenericService';
import Privacy from './pages/Privacy';
import Faqs from './pages/Faqs';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminClients from './pages/admin/AdminClients';
import AdminBlog from './pages/admin/AdminBlog';
import AdminSeo from './pages/admin/AdminSeo';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminProjects from './pages/admin/AdminProjects';
import AdminMedia from './pages/admin/AdminMedia';
import AdminLogs from './pages/admin/AdminLogs';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMessages from './pages/admin/AdminMessages';

import SEO from './components/SEO';
import GoogleAnalytics from './components/GoogleAnalytics';
import WhatsAppButton from './components/WhatsAppButton';
import NotFound from './pages/NotFound';
import { api } from './utils/api';

const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem('barq_admin_auth');
  if (!auth) return <Navigate to="/admin" replace />;
  return children;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    // Only track public routes
    if (!location.pathname.startsWith('/admin')) {
      api.post('/analytics/track', { page_path: location.pathname }).catch(e => console.error(e));
    }
  }, [location.pathname]);

  return (
    <>
      <SEO />
      <GoogleAnalytics />
      {!location.pathname.startsWith('/admin') && <WhatsAppButton />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/web-applications" element={<WebService />} />
        <Route path="/service/ai-agents" element={<AiAgentService />} />
        <Route path="/service/ai-automation" element={<AutomationService />} />
        <Route path="/service/:slug" element={<GenericService />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faqs" element={<Faqs />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/clients" element={<ProtectedRoute><AdminClients /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
        <Route path="/admin/seo" element={<ProtectedRoute><AdminSeo /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute><AdminLogs /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
