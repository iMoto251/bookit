import express from "express";
import helmet from "helmet";
import * as ws from "ws";
import * as http from "http";
import { ClientChannel } from "./ClientChannel";

const app = express();

app.use(helmet());

app.use("/", async (req, res) => {
  res.json("This is a WebSocket endpoint; UPGRADE, yeah?");
});

const server = http.createServer(app);
const wss = new ws.Server({ clientTracking: false, noServer: true });
const connections = new Set<ClientChannel>();

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    const channel = new ClientChannel(ws);

    connections.add(channel);

    console.log("New WebSocket connection: ", ws);

    channel.listen("login", async (req) => {
      console.log(req);

      return {
        success: false,
        err: "Not implemented.",
        token: undefined,
      };
    });
  });
});

server.listen(8080);
