import "dotenv/config";

export const envs = {
  SERVER_PORT: process.env.SERVER_PORT,
  JWT_SEED: process.env.JWT_SEED,
  DATABASE: process.env.DATABASE,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
};
