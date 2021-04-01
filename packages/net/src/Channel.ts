import { Check, CheckOf, v } from "./validator";
import { defaultSchema } from "./defaultSchema";

export const isWrappedMessage = v.iface({
  kind: v.string,
  sequence: v.number,
  responseTo: v.optional(v.number),
  timestamp: v.number,
});

export type WrappedMessage = CheckOf<typeof isWrappedMessage>;

type MessageDefs = {
  [K: string]: {
    request: Check<any>;
    response: Check<any>;
  };
};

/**
 * A channel that can send and receive validated messages.
 *
 * Implementors should include `sendWrapped` for sending wrapped messages and invoke `receiveWrapped` when wrapped
 * messages are received. `Channel` makes no assumptions about the transport used; only that these two functions are
 * available.
 */
export abstract class Channel<Schema extends MessageDefs> {
  /**
   * The timeout duration for responses, in milliseconds.
   */
  protected timeout = 5000;

  /**
   * The current message sequence number; strictly increasing, and unique for each message.
   */
  private sequence = 0;

  /**
   * *Request* listeners waiting for named messages.
   */
  private listeners: {
    [K in keyof Schema]?: (data: unknown) => unknown;
  } = {};

  /**
   * *Response* listeners waiting for a response to a request's sequence number.
   */
  private waiting: {
    [K: number]: ((data: unknown) => void) | undefined;
  } = {};

  /**
   * Construct a new `Channel` with the given message definitions.
   */
  protected constructor(private defs: Schema) {}

  /**
   * Send a request over the channel, returning a response.
   */
  public send<K extends keyof Schema>(
    name: K,
    data: CheckOf<Schema[K]["request"]>
  ): Promise<Schema[K]["response"]> {
    return new Promise((resolve, reject) => {
      const seq = ++this.sequence;
      let timeoutId: ReturnType<typeof setTimeout>;

      this.sendWrapped(
        Object.assign({}, data, {
          kind: name,
          sequence: seq,
          timestamp: Date.now(),
        })
      );

      this.waiting[seq] = (data) => {
        delete this.waiting[seq];
        clearTimeout(timeoutId);

        if (this.isResponse(name, data)) {
          resolve(data);
        } else {
          reject({
            reason: "Invalid response payload for " + name,
            context: data,
          });
        }
      };

      timeoutId = setTimeout(() => {
        delete this.waiting[seq];

        reject({
          reason: "Request timed out after " + this.timeout + "ms.",
        });
      }, this.timeout);
    });
  }

  /**
   * Listen for a specific request on the channel, providing a response.
   *
   * Only one listener can be defined for an endpoint at a time. Calling this function more than once for the same
   * endpoint will overwrite the prior listener.
   */
  public listen<K extends keyof Schema>(
    name: K,
    callback: (
      req: CheckOf<Schema[K]["request"]>
    ) => Promise<CheckOf<Schema[K]["response"]>>
  ) {
    this.listeners[name] = (data) => {
      if (isWrappedMessage(data) && this.isRequest(name, data)) {
        callback(data)
          .then((res) => {
            const sequence = ++this.sequence;

            this.sendWrapped(
              Object.assign({}, res, {
                kind: data.name,
                sequence,
                responseTo: data.sequence,
                timestamp: Date.now(),
              })
            );
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  }

  /**
   * Returns `true` if the provided value is a valid request message for `name`.
   */
  protected isRequest<K extends keyof Schema>(
    name: K,
    value: unknown
  ): value is CheckOf<Schema[K]["request"]> {
    return this.defs[name]["request"](value);
  }

  /**
   * Returns `true` if the provided value is a valid response message for `name`.
   */
  protected isResponse<K extends keyof Schema>(
    name: K,
    value: unknown
  ): value is CheckOf<Schema[K]["response"]> {
    return this.defs[name]["response"](value);
  }

  /**
   * Receive a wrapped message from the channel.
   */
  protected receiveWrapped(data: WrappedMessage) {
    if (data.responseTo) {
      const handler = this.waiting[data.responseTo];

      if (handler) {
        handler(data);
      }

      return;
    }

    const handler = this.listeners[data.kind];

    if (handler) {
      handler(data);
    }
  }

  /**
   * Receive an unknown value from the channel, attempting to interpret it as JSON. If the value can't be interpreted
   * as a wrapped message, it is discarded.
   */
  protected receiveJSON(data: unknown) {
    let decoded = {};

    if (typeof data === "string") {
      try {
        decoded = JSON.parse(data);
      } catch (e) {
        /* do nothing. */
      }
    } else if (typeof data === "object" && data !== null) {
      decoded = data;
    }

    if (isWrappedMessage(decoded)) {
      this.receiveWrapped(decoded);
    }
  }

  /**
   * Send a wrapped message over the channel.
   */
  protected abstract sendWrapped(data: WrappedMessage): void;
}

/**
 * A channel with the default message schema.
 */
export abstract class DefaultChannel extends Channel<typeof defaultSchema> {
  protected constructor() {
    super(defaultSchema);
  }
}
