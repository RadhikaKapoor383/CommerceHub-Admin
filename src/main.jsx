import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import Bootstrap 5 CSS and JS Bundle
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Custom Global Styles
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
