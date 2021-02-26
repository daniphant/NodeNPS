import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const defaultConnectionOptions: MysqlConnectionOptions = {
  type: "mysql",
  entities: [`${__dirname}/../models/*.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

const prodConnectionOptions: MysqlConnectionOptions = {
  ...defaultConnectionOptions,
  username: "",
  password: "",
  database: "",
};

const devConnectionOptions: MysqlConnectionOptions = {
  ...defaultConnectionOptions,
  username: "",
  password: "",
  database: "",
};

const testConnectionOptions: MysqlConnectionOptions = {
  ...defaultConnectionOptions,
  username: "",
  password: "",
  database: "",
};

export default {
  dev: devConnectionOptions,
  prod: prodConnectionOptions,
  test: testConnectionOptions,
};
