import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './firebase.js';
import './styles/index.css';
import './script.js';
import { initErrorTracker } from './engine/services/errorTracker.js';

initErrorTracker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
