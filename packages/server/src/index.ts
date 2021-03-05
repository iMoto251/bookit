import express from "express";
import helmet from "helmet";
import { Channel } from "../../net/src/Channel";

const app = express();

app.use(helmet());

app.use("/", (req, res) => {});

app.listen(8080);

class ApiChannel extends Channel<any> {
  public send(value: any): Promise<void> {
    return new Promise((_, reject) => {
      reject("Cannot send messages from the server.");
    });
  }
}
