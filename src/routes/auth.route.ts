import { Router } from "express";
import { AuthDatasource } from "../datasources/auth.datasource";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDatasource();
    const authRepository = new AuthRepository(datasource);
    const controller = new AuthController(authRepository);

    router.post("/register", controller.register);
    router.post("/login", controller.loginUser);
    router.post("/register-admin", controller.createAdmin);

    return router;
  }
}
