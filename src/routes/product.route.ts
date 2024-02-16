import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductDatasource } from "../datasources/product.datasource";
import { ProductRepository } from "../repositories/product.repository";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new ProductDatasource();
    const productRepository = new ProductRepository(datasource);
    const controller = new ProductController(productRepository);

    router.get("/", controller.getAllProducts);
    router.get("/:id", controller.getProductById);
    router.post("/", controller.createProduct);
    router.put("/:id", controller.updateProductById);
    router.put("/images/:id", controller.updateProductImagesById);
    // todo: endpoint para editar una imagen especifica quizas
    router.delete("/:id", controller.deleteProductById);

    return router;
  }
}
