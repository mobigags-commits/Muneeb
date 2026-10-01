import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Automatically register and update the PWA service worker
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('Shaheen Quran Academy App: New version available.');
  },
  onOfflineReady() {
    console.log('Shaheen Quran Academy App: Ready to work offline.');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
