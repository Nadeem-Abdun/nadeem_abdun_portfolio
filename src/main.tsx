import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}
      >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
