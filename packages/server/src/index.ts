import WebSocket from "ws";
import { ClientChannel } from "./ClientChannel";

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  const channel = new ClientChannel(ws);

  console.log("New WebSocket connection.");

  channel.listen("login", async (req) => {
    console.log(req);

    return {
      success: false,
      err: "Not implemented.",
      token: undefined,
    };
  });

  channel.listen("ping", async (req) => {
    return {};
  });
});

console.log("Listening...");
