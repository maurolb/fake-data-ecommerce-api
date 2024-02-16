import app from "./app";
import { envs } from "./config/envs";
import { sequelize } from "./database/dbconfig";

async function main() {
  await sequelize.sync({ force: true });
  console.log("Database synchronized.");
  app.listen(Number(envs.SERVER_PORT));
  console.log(`Server is running on port ${envs.SERVER_PORT}`);
}

main();

export default app;
