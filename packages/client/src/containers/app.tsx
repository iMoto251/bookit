import { Component, h, render } from 'preact';
//import { Router, Route } from 'preact-router';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import HomePage from './home';
import LoginPage from "./login";
import HelpPage from "./help";

const NoMatchPage = () => <div>
  <p>404</p>
</div>

export default function App(){
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage}>
              <HomePage />
              <Route exact path="/login" component={LoginPage}>
                <LoginPage />
              </Route>
              <Route exact path="/help" component={HelpPage}>
                <HelpPage />
              </Route>
            </Route>
            <Route path="" component={NoMatchPage} />
          </Switch>
      </BrowserRouter>
    );
  }
