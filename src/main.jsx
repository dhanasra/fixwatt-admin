import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store.js';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarContainer } from './utils/snackbar-utils.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReduxProvider store={ store }>
    <BrowserRouter>
      <SnackbarContainer/>
      <App/>
    </BrowserRouter>
  </ReduxProvider>
)
