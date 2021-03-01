import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

// The Login Info for the development server, has to be declared like this so running migrations through typeorm CLI still works.
const defaultConnectionOptions: MysqlConnectionOptions = {
  type: "mysql",
  username: "",
  password: "",
  database: "",
  entities: [`${__dirname}/../models/*.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

export const prodConnectionOptions: MysqlConnectionOptions = {
  ...defaultConnectionOptions,
  username: "",
  password: "",
  database: "",
};

export const testConnectionOptions: MysqlConnectionOptions = {
  ...defaultConnectionOptions,
  username: "",
  password: "",
  database: "",
};

export default defaultConnectionOptions;
