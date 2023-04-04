import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage'; // Corrección aquí, eliminando el punto extra
import DetailPage from './components/DetailPage/DetailPage';
import FormPage from './components/FormPage/FormPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
        <Route exact path="/recipe/:id" component={DetailPage} />
        <Route exact path="/create" component={FormPage} />
        <Route path="*" render={() => <h1>404 - Page Not Found</h1>} />
      </Switch>
    </Router>
  );
};

export default AppRouter;



