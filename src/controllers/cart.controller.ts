import { Request, Response } from "express";
import { ErrorHandler } from "../errors/error.handler";
import { CartRepository } from "../repositories/cart.repository";

export class CartController {
  constructor(private readonly cartRepository: CartRepository) {}

  getAllCarts = (req: Request, res: Response) => {
    this.cartRepository
      .getAll()
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  getCartById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.cartRepository
      .getById(id)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  getCartByUserId = (req: Request, res: Response) => {
    const { id } = req.body.user;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.cartRepository
      .getByUserId(id)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };
}
