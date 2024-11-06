import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './hook/useUser.jsx';  // Use uppercase 'UserProvider'
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* Use UserProvider instead of userProvider */}
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
);
