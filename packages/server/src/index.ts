import WebSocket from "ws";
import { ClientChannel } from "./ClientChannel";
import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";

(async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: "database",
    username: "postgres",
    password: "password",
    models: [__dirname + "/models"],
  });

  const migrate = new Umzug({
    migrations: { glob: "migrations/*.ts" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await migrate.up();

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
})();
