import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { RolesMiddleware } from "../middlewares/roles.middleware";
import { UserDatasource } from "../datasources/user.datasource";
import { UserRepository } from "../repositories/user.repository";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new UserDatasource();
    const userRepository = new UserRepository(datasource);
    const controller = new UserController(userRepository);

    router.get(
      "/",
      [RolesMiddleware.validateAdminRole],
      controller.getAllUsers
    );
    router.get("/:id", controller.getUserById);
    router.put("/:id", controller.updateUserById);
    router.delete("/:id", controller.deleteUserById);

    return router;
  }
}
