import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { LayoutProvider } from './context/LayoutContext';
import { SiteProvider } from './context/SiteContext';
import { UserProvider } from './context/UserContext';
import * as serviceWorker from './serviceWorker';
import Themes from './themes';

ReactDOM.render(
  <LayoutProvider>
    <ThemeProvider theme={Themes.default}>
      <UserProvider>
        <SiteProvider>
          <AppProvider>
            <CssBaseline />
            <App />
          </AppProvider>
        </SiteProvider>
      </UserProvider>
    </ThemeProvider>
  </LayoutProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.unregister();
