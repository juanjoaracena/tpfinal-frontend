import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp.jsx'
import './index.css'
import { ChatProvider } from './context/ChatContext.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { FontProvider } from './theme/FontProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FontProvider>
        <ChatProvider>
          <RouterApp />
        </ChatProvider>
      </FontProvider>
    </ThemeProvider>
  </StrictMode>,
)
