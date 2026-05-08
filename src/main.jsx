import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';

// React 19 compatibility for react-quill
if (!ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = (el) => el;
}
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { SiteProvider } from './context/SiteContext.jsx';
import './styles/bootstrap.min.css';
import './styles/animate.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/style.css';

import { HelmetProvider } from 'react-helmet-async';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <LanguageProvider>
          <SiteProvider>
            <App />
          </SiteProvider>
        </LanguageProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
