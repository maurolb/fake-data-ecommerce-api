import { CartEntity } from "../entities/cart.entity";
import { CustomError } from "../errors/custom.error";
import { CartMapper } from "../mappers/cart.mapper";
import Cart from "../models/cart.model";
import ItemCart from "../models/itemcart.model";

export class CartDatasource {
  async getAll(): Promise<CartEntity[]> {
    try {
      const cartsDb = await Cart.findAll({
        include: [ItemCart],
      });

      const carts: CartEntity[] = [];

      cartsDb.forEach((cart: Cart) => {
        carts.push(CartMapper.cartEntityFromObject(cart));
      });

      return carts;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getById(id: string): Promise<CartEntity> {
    try {
      const cart = await Cart.findByPk(id, { include: [ItemCart] });
      if (!cart) throw CustomError.notFound("Cart not found");

      return CartMapper.cartEntityFromObject(cart);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getByUserId(userId: string): Promise<CartEntity> {
    try {
      const cart = await Cart.findOne({
        where: { userId },
        include: [ItemCart],
      });
      if (!cart) throw CustomError.notFound("Cart not found");

      return CartMapper.cartEntityFromObject(cart);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
