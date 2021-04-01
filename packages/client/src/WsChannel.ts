import { DefaultChannel, WrappedMessage } from "../../net/src/Channel";

/**
 * A client WebSocket channel that uses JSON message-passing as a transport.
 */
export class WsChannel extends DefaultChannel {
  /**
   * The inner WebSocket this channel uses to communicate.
   */
  private ws: WebSocket;

  /**
   * The current failure backoff, in milliseconds. The channel will try to reconnect after this time has elapsed.
   */
  private backoff = 100;

  /**
   * The minimum failure backoff, in milliseconds.
   */
  private minBackoff = 100;

  /**
   * The maximum failure backoff, in milliseconds.
   */
  private maxBackoff = 8000;

  /**
   * A random spread applied to the backoff to prevent spikes in server load.
   */
  private backOffSpread = 1000;

  /**
   * The current batch of outgoing messages.
   */
  private batch = new Set<WrappedMessage>();

  /**
   * Construct a new `WsChannel` using the provided websocket URI.
   */
  constructor(private url: string) {
    super();

    this.ws = new WebSocket(this.url);

    this.connect();
  }

  /**
   * Send a wrapped message over the channel. Flushes all pending messages immediately if possible.
   */
  protected sendWrapped(data: WrappedMessage) {
    this.batch.add(data);

    if (this.ws.readyState === WebSocket.OPEN) {
      this.flush();
    }
  }

  /**
   * Performs exponential backoff if the endpoint is unreachable.
   */
  private performBackoff() {
    this.backoff = Math.min(this.backoff * 2, this.maxBackoff);

    setTimeout(() => {
      this.ws = new WebSocket(this.url);

      this.connect();
    }, this.backoff + Math.random() * this.backOffSpread);
  }

  /**
   * Connects to the endpoint and registers event handlers.
   */
  private connect() {
    this.ws.addEventListener("open", () => {
      this.backoff = this.minBackoff;

      this.flush();
    });

    this.ws.addEventListener("close", () => {
      this.performBackoff();
    });

    this.ws.addEventListener("error", () => {
      this.performBackoff();
    });

    this.ws.addEventListener("message", (ev) => {
      this.receiveJSON(ev.data);
    });
  }

  private flush() {
    for (let msg of this.batch) {
      this.ws.send(JSON.stringify(msg));
    }

    this.batch.clear();
  }
}

export const apiChannel = new WsChannel(
  (document.location.protocol === "https:" ? "wss://" : "ws://") +
    document.location.host +
    "/api"
);

setInterval(() => {
  apiChannel
    .send("ping", {})
    .then((r) => console.log("Ping response: ", r))
    .catch((err) => console.log("Ping error: ", err));
}, 1000);
