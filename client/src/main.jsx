import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Adjust the path as necessary
import './index.css'; // Ensure your CSS file is correctly located
import { UserProvider } from './contexts/UserContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
);
