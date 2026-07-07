import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './firebase.js';
import './styles/index.css';
import './script.js';
import { initErrorTracker } from './engine/services/errorTracker.js';

initErrorTracker();

// Reticle dev SDK — stripped from production builds
if (import.meta.env.DEV) {
  import('./reticle-dev.js');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
