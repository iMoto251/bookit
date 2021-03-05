import { Event } from "./Event";

/**
 * A full-duplex message channel.
 */
export abstract class Channel<T> {
  private bindings = new Set<(value: T) => void>();

  public abstract send(value: T): Promise<void>;

  public bind(fn: (value: T) => void) {
    this.bindings.add(fn);
  }

  protected receive(value: T) {
    for (let fn of this.bindings) {
      fn(value);
    }
  }
}
