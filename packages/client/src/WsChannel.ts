import { Channel, WrappedMessageBody } from "../../net/src/Channel";

export class WsChannel extends Channel {
  private ws: WebSocket;
  private backOff = 1000;
  private maxBackoff = 8000;
  private backOffSpread = 1000;
  private batch = new Set<WrappedMessageBody>();

  constructor(private url: string) {
    super();

    this.connect();
  }

  private performBackoff() {
    this.backOff = Math.min(this.backOff * 2, this.maxBackoff);

    setTimeout(() => {
      this.connect();
    }, this.backOff + Math.random() * this.backOffSpread);
  }

  private connect() {
    const ws = (this.ws = new WebSocket(this.url));

    ws.addEventListener("open", () => {
      this.backOff = 1;

      this.flush();
    });

    ws.addEventListener("close", () => {
      this.performBackoff();
    });

    ws.addEventListener("error", () => {
      this.performBackoff();
    });

    ws.addEventListener("message", (ev) => {
      this.receive(ev.data);
    });
  }

  private flush() {
    for (let msg of this.batch) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  protected sendRaw(data: WrappedMessageBody) {
    this.batch.add(data);

    if (this.ws.readyState === WebSocket.OPEN) {
      this.flush();
    }
  }
}
