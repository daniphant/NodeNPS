import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import routes from "./routes";
import connectionOptions from "./database/ormconfig";

const main = async () => {
  const app = express();
  await createConnection(connectionOptions);

  app.use(express.json());
  app.use(routes);

  app.listen(3333, () => console.log("Server is up."));
};

main();
