import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept third-party cross-origin iframe security errors (e.g. Disqus accessing parent.document)
if (typeof window !== 'undefined') {
  const isSecurityError = (err: any) => {
    if (!err) return false;
    const msg = String(err.message || err.reason?.message || err.reason || err);
    return (
      msg.includes('Permission denied') ||
      msg.includes('cross-origin object') ||
      msg.includes('SecurityError') ||
      err.name === 'SecurityError' ||
      err.reason?.name === 'SecurityError'
    );
  };

  window.addEventListener(
    'error',
    (event) => {
      if (isSecurityError(event.error) || isSecurityError(event)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      if (isSecurityError(event.reason) || isSecurityError(event)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
