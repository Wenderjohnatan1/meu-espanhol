import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker with recovery cleanup
if ('serviceWorker' in navigator) {
  const CLEANUP_KEY = 'pwa_cleanup_v4';
  if (!localStorage.getItem(CLEANUP_KEY)) {
    // Force clear all old service workers and caches to recover from white-screen bugs
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
      if (window.caches) {
        caches.keys().then((names) => {
          Promise.all(names.map(name => caches.delete(name))).then(() => {
            localStorage.setItem(CLEANUP_KEY, 'true');
            window.location.reload();
          });
        });
      } else {
        localStorage.setItem(CLEANUP_KEY, 'true');
        window.location.reload();
      }
    });
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('PWA Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.error('PWA Service Worker registration failed:', err);
        });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
