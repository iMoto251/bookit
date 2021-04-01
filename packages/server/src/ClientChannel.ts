import WebSocket from "ws";
import { DefaultChannel, WrappedMessage } from "../../net/src/Channel";

/**
 * A channel to an individual client, over a single WebSocket connection.
 */
export class ClientChannel extends DefaultChannel {
  /**
   * Construct a new `ClientChannel` from a `WebSocket`.
   */
  constructor(private ws: WebSocket) {
    super();

    ws.addEventListener("message", (msg) => {
      this.receiveJSON(msg.data);
    });
  }

  protected sendWrapped(data: WrappedMessage): void {
    this.ws.send(JSON.stringify(data));
  }
}
