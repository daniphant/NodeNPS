import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./database/ormconfig";

const main = async () => {
  await createConnection(connectionOptions);

  app.listen(3333, () => console.log("Server is up."));
};

main();
