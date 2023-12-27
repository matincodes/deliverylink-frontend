import React from 'react'
import { createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './app/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
