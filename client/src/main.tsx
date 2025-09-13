import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import store from './store/store.ts';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { SocketProvider } from './context/SocketContext.tsx';
import App from './App.tsx';
import './api/interceptors.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider enableCssLayer>
          <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
          <SocketProvider>
            <App />
          </SocketProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
