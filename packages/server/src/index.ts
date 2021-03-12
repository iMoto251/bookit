import express from "express";
import helmet from "helmet";
import { Channel } from "../../net/src/Channel";
import { Message } from "../../net/src/Message/Message";
import bodyParser from "body-parser";

type JsonSafe =
  | number
  | string
  | void
  | Array<JsonSafe>
  | { [K: string]: JsonSafe }
  | { [K: number]: JsonSafe };

class ApiChannel extends Channel<any> {
  public send(value: any): Promise<void> {
    return new Promise((_, reject) => {
      reject("Cannot send messages from the server.");
    });
  }

  public doReceive(value: any) {
    this.receive(value);
  }
}

const channel = new ApiChannel();

Message.setGlobalChannel(channel);

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

  channel.doReceive(json);
});

app.listen(8080);
