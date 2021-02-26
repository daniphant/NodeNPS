import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const connectionOptions: MysqlConnectionOptions = {
  type: "mysql",
  entities: [`${__dirname}/../models/*.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

// extends connectionOptions with data based on which environment you're on
export default {
  test: {
    ...connectionOptions,
    username: "",
    password: "",
    database: "",
  },
  dev: {
    ...connectionOptions,
    username: "",
    password: "",
    database: "",
  },
  prod: {
    ...connectionOptions,
    username: "",
    password: "",
    database: "",
  },
};
