import { Router } from "express";
import { CartDatasource } from "../datasources/cart.datasource";
import { CartRepository } from "../repositories/cart.repository";
import { CartController } from "../controllers/cart.controller";
import { RolesMiddleware } from "../middlewares/roles.middleware";

export class CartRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new CartDatasource();
    const cartRepository = new CartRepository(datasource);
    const controller = new CartController(cartRepository);

    router.get(
      "/",
      [RolesMiddleware.validateAdminRole],
      controller.getAllCarts
    );
    router.get("/user-cart", controller.getCartByUserId);
    router.get(
      "/:id",
      [RolesMiddleware.validateAdminRole],
      controller.getCartById
    );

    return router;
  }
}
