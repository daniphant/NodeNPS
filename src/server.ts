import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import defaultConnectionOptions, {
  prodConnectionOptions,
} from "./database/ormconfig";

const main = async () => {
  await createConnection(
    process.env.NODE_ENV === "prod"
      ? prodConnectionOptions
      : defaultConnectionOptions
  );

  app.listen(3333, () => console.log("Server is up."));
};

main();
