import express, { Application, Router, urlencoded } from "express";
import cors from "cors";

import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

interface Options {
  port?: number;
  routes: Router;
}

export class ServerApp {
  public readonly app: Application = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors());

    // Swagger
    const swaggerDocument = YAML.load("./src/swagger/swagger.yaml");
    const specs = swaggerDocument;
    this.app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

    // Routes
    this.app.use(this.routes);

    // Listen port
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}
