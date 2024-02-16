import express, { Application, urlencoded } from "express";
import cors from "cors";
import { AppRoutes } from "./routes/routes";

import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

const swaggerDocument = YAML.load("./src/swagger/swagger.yaml");

export const specs = swaggerDocument;

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(AppRoutes.routes);

export default app;
