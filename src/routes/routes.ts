import { Router } from "express";
import { UserRoutes } from "./user.route";
import { ProductRoutes } from "./product.route";
import { AuthRoutes } from "./auth.route";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RolesMiddleware } from "../middlewares/roles.middleware";
import { CartRoutes } from "./cart.route";
import { ItemCartRoutes } from "./item.cart.route";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(
      "/api/users",
      [AuthMiddleware.validateJWT, RolesMiddleware.validateUserRole],
      UserRoutes.routes
    );
    router.use(
      "/api/products",
      [AuthMiddleware.validateJWT, RolesMiddleware.validateAdminRole],
      ProductRoutes.routes
    );
    router.use(
      "/api/carts",
      [AuthMiddleware.validateJWT, RolesMiddleware.validateUserRole],
      CartRoutes.routes
    );
    router.use(
      "/api/items",
      [AuthMiddleware.validateJWT, RolesMiddleware.validateUserRole],
      ItemCartRoutes.routes
    );
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
