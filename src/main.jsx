import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './themes'
import { LayoutProvider } from './contexts/LayoutContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { SiteProvider } from './contexts/SiteContext.jsx'
import { AppProvider } from './contexts/AppContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayoutProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <SiteProvider>
            <AppProvider>
              <CssBaseline />
              <App />
            </AppProvider>
          </SiteProvider>
        </UserProvider>
      </ThemeProvider>
    </LayoutProvider>
  </StrictMode>
)
