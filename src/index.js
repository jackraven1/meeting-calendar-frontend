import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MeetingProvider } from './context/MeetingContext'; // Import the provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MeetingProvider> {/* Wrap App with MeetingProvider */}
      <App />
    </MeetingProvider>
  </React.StrictMode>
);

reportWebVitals();
