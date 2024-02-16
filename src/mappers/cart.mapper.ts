import { CartEntity } from "../entities/cart.entity";
import { CustomError } from "../errors/custom.error";

export class CartMapper {
  static cartEntityFromObject(object: { [key: string]: any }) {
    const { id, userId, items } = object;

    if (!id) throw CustomError.badRequest("Missing id");

    return new CartEntity(id, userId, items);
  }
}
