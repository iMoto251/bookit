import * as React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import HomePage from "./home";
import LoginPage from "./login";
import HelpPage from "./help";
import Recommendation from "./recommendation";
import Header from "../components/header"

const NoMatchPage = () => (
  <div className="login">
    <p>404</p>
  </div>
);

export default function App() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/help" component={HelpPage} />
        <Route exact path="/recommendation" component={Recommendation} />
        <Route component={NoMatchPage} />
      </Switch>
    </HashRouter>
  );
}
