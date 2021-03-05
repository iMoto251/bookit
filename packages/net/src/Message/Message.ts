import { v, Check, CheckOf } from "../validator";

/**
 * Required fields on messages.
 */
const MessageProps = v.iface({
  /**
   * The unique ID of the message, generally a sequence starting from 0.
   */
  id: v.number,

  /**
   * If applicable, the message this one is responding to.
   */
  responseTo: v.optional(v.number),

  /**
   * The millisecond-precision UNIX timestamp of the message.
   */
  timestamp: v.number,

  /**
   * The kind of the message.
   */
  kind: v.string,
});

let sequence = 0;

/**
 * A JSON-encodable message schema fit for server/client transport.
 */
export class Message<Req, Res> {
  private static named = new Map<string, Message<any, any>>();
  private static waiting = new Map<number, (res: unknown) => void>();
  private static sender?: (
    value: unknown,
    dispatch: (response: unknown) => void
  ) => void;

  /**
   * Constructs a new `Message`, given a request and response validator.
   */
  constructor(
    private kind: string,
    private requestValidator: Check<Req>,
    private responseValidator: Check<Res>
  ) {
    Message.named.set(kind, this);
  }

  /**
   * Sets the global sender. The provided closure should call `respond` with
   * a valid response.
   */
  public static setGlobalSender(
    sender: (
      value: unknown,
      respond: (response: unknown) => void
    ) => Promise<unknown>
  ) {
    this.sender = sender;
  }

  /**
   * Dispatches a received message or response.
   */
  private static dispatch(message: unknown) {
    if (!MessageProps(message)) {
      return;
    }

    if (message.responseTo) {
      const callback = Message.waiting.get(message.responseTo);

      Message.waiting.delete(message.responseTo);

      callback(message);

      return;
    }

    const named = Message.named.get(message.kind);

    if (named) {
      named.receive(message);
    }
  }

  /**
   * Sends a value to the peer and waits for a response.
   */
  public send(value: Req): Promise<Res> {
    return new Promise((resolve, reject) => {
      sequence++;

      const request: Req & CheckOf<typeof MessageProps> = Object.assign(
        {},
        value,
        {
          id: sequence,
          timestamp: Date.now(),
          responseTo: undefined,
          kind: this.kind,
        }
      );

      if (Message.sender) {
        Message.sender(request, Message.dispatch);
      } else {
        reject("No global sender.");
      }

      Message.waiting.set(sequence, (value) => {
        if (this.responseValidator(value)) {
          resolve(value);
        } else {
          reject(value);
        }
      });
    });
  }

  private receiver?: (req: Req) => Promise<Res>;

  private receive(req: unknown): Promise<Res> {
    return new Promise((resolve, reject) => {
      if (this.requestValidator(req) && this.receiver) {
        resolve(this.receiver(req));
      }

      reject(req);
    });
  }

  public bind(fn: (req: Req) => Promise<Res>) {
    this.receiver = fn;
  }
}
