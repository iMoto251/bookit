import { Check, CheckOf, v } from "./validator";

/**
 * A service request/response schema that can be used to validate
 * message schemas.
 */
export type ServiceSchema<Req, Res> = {
  kind: string,
  request: Check<Req>,
  response: Check<Res>,
}

const wrappedMessage = v.iface({
  kind: v.string,
  sequence: v.number,
  responseTo: v.optional(v.number),
  timestamp: v.number,
});

type WrappedMessage = CheckOf<typeof wrappedMessage>;

/**
 * A channel that can send and receive messages.
 */
export abstract class Channel {
  /**
   * Send data over the channel.
   */
  public abstract send(data: unknown);

  /**
   * Receive data from the channel.
   */
  public abstract receive(fn: (unknown) => void);
}

class Compose<Req, Res> {
  private thenable = new Set<(res: Res) => void>();
  private schema: ServiceSchema<Req, Res>;
  private sequence: number;

  constructor(channel: Channel) {

  }

  public then(callback: (res: Res) => void) {
    this.thenable.add(callback);
  }
}

export class ServiceProvider {
  constructor(private channel: Channel) {
    channel.receive
  }
}
