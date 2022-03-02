import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './components/Layout';
import Error from './pages/error';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
          <Route path="/app" component={Layout} />
          <Route component={Error} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
