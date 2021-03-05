import * as express from "express";
import * as helmet from "helmet";
import { Message } from "$net";

const app = express();

app.use(helmet());

app.use("/", (req, res) => {});

app.listen(8080);
