import { Component, h, render } from "preact";

//import { BrowserRouter as Router, Link, NavLink, Route, Switch } from 'react-router-dom';

//import App from "./app";
import LoginPage from './login';
//import HomePage from './home';
//import Help from './help';

export class Main extends Component {
  render() {
    return (
      <div>
        <LoginPage />
      </div>
    );
  }
}

render(<Main />, document.body);
