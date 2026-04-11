import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { initAnalytics } from '@config/firebase';
import './index.css';

// Dev-only: validate site config on startup (stripped from production build)
if (import.meta.env.DEV) {
  import('./utils/validate-config').then(({ validateConfig }) => validateConfig());
}

if (import.meta.env.PROD) {
  initAnalytics().catch(() => {
    // Ignore analytics initialization failures to keep the app functional.
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
