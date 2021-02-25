import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const connectionOptions: MysqlConnectionOptions = {
  type: "mysql",
  username: "root",
  password: "",
  database: "nodenps",
};

export default connectionOptions;
