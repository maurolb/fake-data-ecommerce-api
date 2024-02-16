import { ServerApp } from "./app";
import { envs } from "./config/envs";
import { sequelize } from "./database/dbconfig";
import { AppRoutes } from "./routes/routes";

const server = new ServerApp({
  port: Number(envs.SERVER_PORT),
  routes: AppRoutes.routes,
});

main(server);

export { server };

export async function main(server: ServerApp) {
  await sequelize.sync({ force: true });
  console.log("Database synchronized.");

  await server.start();
}

// async function main() {
//   await sequelize.sync({ force: true });
//   console.log("Database synchronized.");
//   app.listen(Number(envs.SERVER_PORT));
//   console.log(`Server is running on port ${envs.SERVER_PORT}`);
// }

// main();

// export default app;
