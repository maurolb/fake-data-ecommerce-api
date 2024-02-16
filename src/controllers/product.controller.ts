import { Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { ErrorHandler } from "../errors/error.handler";
import { CreateProductDto } from "../dtos/product/create.product.dto";
import { UpdateProductDto } from "../dtos/product/update.product.dto";
import { UpdateImagesDto } from "../dtos/product/update.images.dto";

export class ProductController {
  constructor(private readonly productRepository: ProductRepository) {}

  getAllProducts = (req: Request, res: Response) => {
    this.productRepository
      .getAll()
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  getProductById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.productRepository
      .getById(id)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  deleteProductById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.productRepository
      .deleteById(id)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.productRepository
      .create(createProductDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  updateProductById = (req: Request, res: Response) => {
    const [error, updateProductDto] = UpdateProductDto.update(
      req.params.id,
      req.body
    );

    if (error) return res.status(400).json({ error });

    this.productRepository
      .updateById(updateProductDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  updateProductImagesById = (req: Request, res: Response) => {
    const [error, updateImagesDto] = UpdateImagesDto.update(
      req.params.id,
      req.body
    );

    if (error) return res.status(400).json({ error });

    this.productRepository
      .updateImagesById(updateImagesDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };
}
