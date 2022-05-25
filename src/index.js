import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { TitleBarContextProvider } from './contexts/TitleBarContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
      <TitleBarContextProvider>
        <Router>
          <App />
        </Router>
      </TitleBarContextProvider>
    </AuthProvider>
  </StrictMode>
);
