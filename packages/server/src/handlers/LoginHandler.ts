import { Login } from "../../../net/src/Message/Login";

Login.receive(async (req) => {
  return {
    success: false,
    token: "",
    errmsg: undefined,
  };
});
