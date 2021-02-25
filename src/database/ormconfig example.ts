import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const connectionOptions: MysqlConnectionOptions = {
  type: "mysql",
  username: "root",
  password: "",
  database: "nodenps",
  migrations: [`${__dirname}/migrations/*.ts`],
  cli: {
    migrationsDir: `${__dirname}/migrations`,
  },
};

export default connectionOptions;
