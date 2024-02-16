import path from "path";
import { envs } from "../config/envs";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: envs.DATABASE,
  username: envs.USER,
  password: envs.PASSWORD,
  host: envs.HOST,
  port: Number(envs.PORT),
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
  models: [path.join(__dirname, "..", "models")],
});
