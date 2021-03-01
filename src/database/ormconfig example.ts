import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const defaultConnectionOptions: MysqlConnectionOptions = {
  type: "mysql",
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

export const devConnectionOptions: MysqlConnectionOptions = {
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
