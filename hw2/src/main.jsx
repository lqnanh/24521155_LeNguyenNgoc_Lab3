import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PianoKeyboard from './PianoKeyboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PianoKeyboard />
  </StrictMode>,
)
