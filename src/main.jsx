import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import '@/styles/index.css';
import { APP_CONFIG } from '@/constants';

// Toast configuration
const toastOptions = {
  duration: 4000,
  position: 'top-right',
  style: {
    background: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
  },
  success: {
    iconTheme: {
      primary: 'var(--color-success)',
      secondary: 'var(--color-bg-primary)',
    },
  },
  error: {
    iconTheme: {
      primary: 'var(--color-error)',
      secondary: 'var(--color-bg-primary)',
    },
  },
};

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster toastOptions={toastOptions} />
    </BrowserRouter>
  </StrictMode>
);
