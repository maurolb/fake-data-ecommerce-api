import { Request, Response } from "express";
import { ItemCartRepository } from "../repositories/item.cart.repository";
import { ErrorHandler } from "../errors/error.handler";
import { CreateItemCartDto } from "../dtos/item-cart/create.item.cart";
import { UpdateItemCartDto } from "../dtos/item-cart/update.item.cart";

export class ItemCartController {
  constructor(private readonly itemCartRepository: ItemCartRepository) {}

  getAllItems = (req: Request, res: Response) => {
    this.itemCartRepository
      .getAll()
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  getAllItemsByUserId = (req: Request, res: Response) => {
    const { id } = req.body.user;

    this.itemCartRepository
      .getAllByUserId(id)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  getItemCartById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.itemCartRepository
      .getById(id)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  createItemCart = (req: Request, res: Response) => {
    const [error, createItemCartDto] = CreateItemCartDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.itemCartRepository
      .create(createItemCartDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  updateItemCartById = (req: Request, res: Response) => {
    const [error, updateItemCartDto] = UpdateItemCartDto.update(
      req.params.id,
      req.body
    );
    if (error) return res.status(400).json({ error });

    this.itemCartRepository
      .updateById(updateItemCartDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  deleteItemCartById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.itemCartRepository
      .deleteById(id)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };
}
