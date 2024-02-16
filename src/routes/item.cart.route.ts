import { Router } from "express";
import { ItemCartDatasource } from "../datasources/item.cart.datasource";
import { ItemCartRepository } from "../repositories/item.cart.repository";
import { ItemCartController } from "../controllers/itemcart.controller";

export class ItemCartRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new ItemCartDatasource();
    const itemCartRepository = new ItemCartRepository(datasource);
    const controller = new ItemCartController(itemCartRepository);

    router.get("/", controller.getAllItems);
    router.get("/user-items", controller.getAllItemsByUserId);
    router.get("/:id", controller.getItemCartById);
    router.post("/", controller.createItemCart);
    router.put("/:id", controller.updateItemCartById);
    router.delete("/:id", controller.deleteItemCartById);

    return router;
  }
}
