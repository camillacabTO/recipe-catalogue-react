import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { FirebaseAuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseAuthContextProvider>
      <App />
    </FirebaseAuthContextProvider>
  </React.StrictMode>
);
