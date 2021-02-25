import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import routes from "./routes";
import connectionOptions from "./ormconfig";

const main = async () => {
  const app = express();
  await createConnection(connectionOptions);


  app.listen(3333, () => console.log("Server is up."));
};

main();
