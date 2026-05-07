import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/service/web-applications" element={<WebService />} />
      <Route path="/service/ai-agents" element={<AiAgentService />} />
      <Route path="/service/ai-automation" element={<AutomationService />} />
      <Route path="/project" element={<Project />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
