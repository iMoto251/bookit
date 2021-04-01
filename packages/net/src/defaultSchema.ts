import { v } from "./validator";

export const defaultSchema = {
  /**
   * Just generate a reply.
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
   * Resume a new or previous session by its token.
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

  /**
   * Invalidate the current session token and close the connection.
   */
  logout: {
    request: v.iface({}),
    response: v.iface({}),
  },

  /**
   * Get the server's current view of the client.
   */
  clientStat: {
    request: v.iface({}),
    response: v.iface({
      // The client's IP address.
      host: v.string,

      // Whether the current connection has been authenticated.
      authenticated: v.boolean,

      // The user's username. Generally their e-mail address.
      username: v.optional(v.string),
    }),
  },

  /**
   * Get the server's view of itself.
   */
  serverStat: {
    request: v.iface({}),
    response: v.iface({
      uptime: v.number,
    }),
  },
};
