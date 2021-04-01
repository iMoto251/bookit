import { v } from "./validator";

export const defaultSchema = {
  /**
   * Ping!
   */
  ping: {
    request: v.iface({}),
    response: v.iface({}),
  },

  /**
   * Log in, generating a session token or an error.
   */
  login: {
    request: v.iface({
      username: v.string,
      password: v.string,
    }),
    response: v.iface({
      success: v.boolean,
      err: v.optional(v.string),
      token: v.optional(v.string),
    }),
  },

  /**
   * Resume a new or previous session.
   */
  resume: {
    request: v.iface({
      token: v.string,
    }),
    response: v.iface({
      success: v.boolean,
      err: v.optional(v.string),
    }),
  },
};
