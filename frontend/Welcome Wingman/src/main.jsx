import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
import './index.css'
import BaseDirectory from './BaseDirectory'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BaseDirectory />
>>>>>>> origin/base-directory
  </StrictMode>,
)
