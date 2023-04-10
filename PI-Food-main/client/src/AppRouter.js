

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import Details from './components/recipeDetail/Details';
import Recipes from './components/forms/Recipes';
import Newcomponent from './components/Newcomponent';
import RecipeSearch from './components/RecipeSearch';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/newComponent" exact render={() => <Newcomponent />} />
        <Route exact path="/recipe/:id" component={Details} />
        <Route exact path="/search" component={RecipeSearch} />
        <Route exact path="/create" component={Recipes} />
        <Route path="/details/:id" exact render={(props) => <Details {...props} />} />
        <Route path="*" render={() => <h1>404 - Page Not Found</h1>} />
      </Switch>
    </Router>
  );
};

export default AppRouter;


