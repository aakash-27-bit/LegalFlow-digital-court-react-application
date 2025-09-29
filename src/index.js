import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './shared/contexts/ThemeContext.new';
import './index.css';
import App from './App';
import { store } from './store/index';
import { Provider } from 'react-redux';
//import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
            <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
