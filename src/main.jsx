import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CotizadorProvider } from './context/CotizadorContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CotizadorProvider>
      <App />
    </CotizadorProvider>
  </StrictMode>
)