import * as React from "react";
import { render } from "react-dom";
import { apiChannel } from "./WsChannel";
import App from "./containers/app";

export class Main extends React.Component {
  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}

const target = document.createElement("div");
document.body.appendChild(target);

render(<Main />, target);

console.log("Default channel: ", apiChannel);
