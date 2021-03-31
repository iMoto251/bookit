import { Check, CheckOf } from "./validator";
import { v } from "./validator";

const TIMEOUT = 5000;

export type Simple =
  | undefined
  | number
  | string
  | boolean
  | { [K: string]: Simple };

export type MessageBody = {
  [K: string]: Simple;
};

const isWrapper = v.iface({
  kind: v.string,
  seq: v.number,
  responseTo: v.optional(v.number),
  timestamp: v.number,
});

export type Wrapper = CheckOf<typeof isWrapper>;

export type WrappedMessageBody = MessageBody & Wrapper;

export type Message<Req extends MessageBody, Res extends MessageBody> = {
  request: Check<Req>;
  response: Check<Res>;
};

export type MessageTable = {
  [K: string]: Message<any, any>;
};

const Login = {
  request: v.iface({
    username: v.string,
    password: v.string,
  }),

  response: v.iface({
    success: v.boolean,
    err: v.optional(v.string),
  }),
};

/**
 * A full-duplex message channel.
 */
abstract class BaseChannel<M extends MessageTable> {
  constructor(private messageTypes: M) {}

  private requestListeners: {
    [K in keyof M]?: (
      req: CheckOf<M[K]["request"]>
    ) => Promise<CheckOf<M[K]["response"]>>;
  } = {};

  private responseListeners = new Map<number, (value: unknown) => void>();

  private sequence = 0;

  protected abstract sendRaw(data: WrappedMessageBody): void;

  protected receive(data: unknown) {
    if (isWrapper(data)) {
      if (typeof data.responseTo !== "undefined") {
        const listener = this.responseListeners.get(data.responseTo);

        if (listener) {
          listener(data);
        }
      } else {
        const listener = this.requestListeners[data.kind];
        const msg = this.messageTypes[data.kind];

        if (msg && listener && msg.request(data)) {
          // TODO(scriptis): `as unknown` makes me hurt
          listener((data as unknown) as CheckOf<M[string]["response"]>).then(
            (response) => {
              const sequence = ++this.sequence;

              const wrapped = Object.assign({}, response, {
                kind: data.kind,
                seq: sequence,
                responseTo: data.seq,
                timestamp: Date.now(),
              });

              this.sendRaw(wrapped);
            }
          );
        }
      }
    }
  }

  public send<K extends keyof M>(
    name: K,
    value: CheckOf<M[K]["request"]>
  ): Promise<CheckOf<M[K]["response"]>> {
    const msg = this.messageTypes[name];

    return new Promise((resolve, reject) => {
      const sequence = ++this.sequence;

      this.sendRaw(
        Object.assign({}, value, {
          kind: name,
          seq: sequence,
          responseTo: undefined,
          timestamp: Date.now(),
        })
      );

      let timeout: ReturnType<typeof setTimeout>;

      timeout = setTimeout(() => {
        this.responseListeners.delete(sequence);

        reject("Response timed out.");
      }, TIMEOUT);

      this.responseListeners.set(sequence, (value) => {
        this.responseListeners.delete(sequence);

        clearTimeout(timeout);

        if (msg.response(value)) {
          resolve(value);
        } else {
          reject("Invalid response: " + value);
        }
      });
    });
  }

  public on<K extends keyof M>(
    name: K,
    fn: (req: CheckOf<M[K]["request"]>) => Promise<CheckOf<M[K]["response"]>>
  ) {
    this.requestListeners[name] = fn;
  }
}

const allMessages = {
  Login,
};

export abstract class Channel extends BaseChannel<typeof allMessages> {
  constructor() {
    super(allMessages);
  }
}
