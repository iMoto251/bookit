import express from "express";
import helmet from "helmet";
import { Channel } from "../../net/src/Channel";
import { Message } from "../../net/src/Message/Message";
import * as ws from "ws";
import * as http from "http";
import bodyParser from "body-parser";

class ClientChannel extends Channel {
  constructor(private ws: WebSocket) {
    super();
  }
}

const app = express();

app.use(helmet());
app.use(bodyParser.text());

app.use("/", async (req, res) => {
  let json;

  try {
    json = JSON.parse(req.body);
  } catch (err) {
    res.status(400);
    res.send(
      JSON.stringify({
        error: "Body is not valid JSON.",
      })
    );
  }
});

const server = http.createServer(app);
const wss = new ws.Server({ clientTracking: false, noServer: true });
const connections = new Set<ClientChannel>();

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    connections.add(new ClientChannel(ws));
  });
});
