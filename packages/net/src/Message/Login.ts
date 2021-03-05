import { v } from "../validator";
import { Message } from "./Message";

export const Login = new Message(
  "Login",
  v.iface({ username: v.string, password: v.string }),
  v.iface({ success: v.boolean, errmsg: v.optional(v.string), token: v.string })
);
