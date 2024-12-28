import React from 'react';
import { createRoot } from 'react-dom/client'; // Named import for createRoot
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found. Make sure an element with id 'root' exists in your HTML.");
}

// Use the named import to create the root
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
