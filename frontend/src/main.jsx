import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter } from 'react-router-dom'; 
import AppRouter from './routers/router.jsx';
import './i18n';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
    <AppRouter />
    </BrowserRouter>
  </StrictMode>,
)
