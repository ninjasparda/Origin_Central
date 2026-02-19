import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OriginThemeProvider } from '@origin-digital/ods-core'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OriginThemeProvider enableThemeSwitching={false}>
      <App />
    </OriginThemeProvider>
  </StrictMode>,
)
