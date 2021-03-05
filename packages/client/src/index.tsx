import { Component, h, render } from "preact";
import { BrowserRouter } from 'react-router-dom';

import App from "./containers/app";

export class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    );
  }
}

render(<Main />, document.body);
