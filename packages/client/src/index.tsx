import { h, Component, render } from "preact";
import App from "./app";

export class Login extends Component {
  render() {
    return (
      <div class="login">
        <App />
      </div>
    );
  }
}

render(<Login />, document.body);
