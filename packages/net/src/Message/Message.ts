import { Channel } from "../Channel";
import { v, Check, CheckOf } from "../validator";

/**
 * Required fields on messages.
 */
const messageProps = v.iface({
  /**
   * The unique ID of the message and its response, generally a sequence starting from 0.
   */
  seq: v.number,

  /**
   * The millisecond-precision UNIX timestamp of the message.
   */
  timestamp: v.number,

  /**
   * The kind of the message.
   */
  kind: v.string,
});

type MessageProps = CheckOf<typeof messageProps>;

let sequence = 0;

/**
 * A full-duplex, validated message channel.
 */
export class Message<Request, Response> {
  private static channel?: Channel<unknown>;
  private static named = new Map<string, Message<unknown, unknown>>();
  private static waiting = new Map<number, (value: unknown) => void>();
  private static TIMEOUT = 60;

  constructor(
    /**
     * The unique name of the `Message`.
     */
    private kind: string,

    /**
     * A function to validate the request body of the `Message`.
     */
    private requestValidator: Check<Request>,

    /**
     * A function to validate the response body of the `Message`.
     */
    private responseValidator: Check<Response>
  ) {}

  /**
   * Sets the `Channel` that all `Message`s will send through. Calling this function
   * more than once will result in an error.
   */
  public static setGlobalChannel(channel: Channel<unknown>) {
    if (this.channel) {
      throw "Cannot assign the global messaging channel more than once";
    }

    this.channel = channel;

    channel.bind((value) => {
      if (messageProps(value)) {
        if (value.seq) {
          const original = this.waiting.get(value.seq);

          if (original) {
            this.waiting.delete(value.seq);

            original(value);
          }
        } else {
          const named = this.named.get(value.kind);

          if (named) {
            named.dispatch(value);
          }
        }
      }
    });
  }

  /**
   * Dispatches a *received* request to this `Message`, i.e., for server handling.
   */
  private dispatch(request: unknown) {
    if (!this.receiver) {
      throw "Message has no attached receiver.";
    }

    if (messageProps(request) && this.requestValidator(request)) {
      this.receiver(request).then((response) => {
        Message.channel?.send(
          Object.assign({}, response, {
            seq: request.seq,
            timestamp: Date.now(),
            kind: this.kind,
          })
        );
      });
    }
  }

  /**
   * Sends a message.
   */
  public send(req: Request): Promise<Response> {
    if (!Message.channel) {
      throw "No global channel configured; cannot send message.";
    }

    return new Promise((resolve, reject) => {
      sequence += 1;

      Message.channel.send(
        Object.assign({}, req, {
          id: sequence,
          kind: this.kind,
          timestamp: Date.now(),
        })
      );

      let timeout;

      Message.waiting.set(sequence, (res) => {
        clearTimeout(timeout);

        Message.waiting.delete(sequence);

        if (this.responseValidator(res)) {
          resolve(res);
        } else {
          reject(res);
        }
      });

      timeout = setTimeout(() => reject("Response timed out"), Message.TIMEOUT);
    });
  }

  private receiver?: (req: Request) => Promise<Response>;

  /**
   * Sets the receiver for this `Message`.
   *
   * A `Message` can only have one receiver at a time; calling the function more than once will
   * overwrite the previous receivers.
   */
  public receive(fn: (req: Request) => Promise<Response>) {
    this.receiver = fn;
  }
}
