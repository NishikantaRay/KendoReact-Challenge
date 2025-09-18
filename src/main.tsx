import { StrictMode } from 'react'
import { setScriptKey } from '@progress/kendo-licensing';


setScriptKey("");

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@progress/kendo-theme-default/dist/all.css'
import './styles/global.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
