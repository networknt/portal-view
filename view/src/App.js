import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import Error from "./pages/error";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route path="/app" component={Layout} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
