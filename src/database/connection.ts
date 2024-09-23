import mysql, { ConnectionOptions } from "mysql2";
import dbConfig from "./db.config";

const access: ConnectionOptions = {
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: Number(dbConfig.PORT),
  // debug: true,
  pool: {
    min: 1,
    max: 15,
    createRetryIntervalMillis: 60000,
  },
  dateStrings: true,
};

export default mysql.createConnection(access);
