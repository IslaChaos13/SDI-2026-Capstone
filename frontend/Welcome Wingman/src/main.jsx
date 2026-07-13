import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BaseDirectory from './BaseDirectory'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BaseDirectory />
  </StrictMode>,
)
