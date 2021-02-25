import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const connectionOptions: MysqlConnectionOptions = {
  type: "mysql",
  username: "root",
  password: "",
  database: "nodenps",
  entities: [`${__dirname}/../models/*.ts`],
  migrations: [`${__dirname}/migrations/*.ts`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

export default connectionOptions;
