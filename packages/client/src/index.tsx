import { Component, h, render } from "preact";

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from "./app";
import LoginPage from './pages/login';
import HomePage from './pages/home';
import Help from './pages/help';

export class Login extends Component {
  render() {
    return (
      <Router>
        <div className="page">
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/help" component={Help} />
          </Switch>
        </div>
      </Router>
    );
  }
}

render(<Login />, document.body);
