import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

// Support legacy hash-style deep links (e.g. #/portal-2741) while using BrowserRouter.
if (window.location.hash?.startsWith('#/')) {
  const hashPath = window.location.hash.slice(1);
  const current = `${window.location.pathname}${window.location.search}`;
  if (hashPath !== current) {
    window.history.replaceState(null, '', hashPath);
  }
}

// Dev-only: validate site config on startup (stripped from production build)
if (import.meta.env.DEV) {
  import('./utils/validate-config').then(({ validateConfig }) => validateConfig());
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
