import { ItemCartEntity } from "../entities/item.cart.entity";
import { CustomError } from "../errors/custom.error";

export class ItemCartMapper {
  static itemCartEntityFromObject(object: { [key: string]: any }) {
    const { id, cartId, productId, quantity, total } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!cartId) throw CustomError.badRequest("Missing cart id");
    if (!productId) throw CustomError.badRequest("Missing product id");
    if (!quantity) throw CustomError.badRequest("Missing quantity");
    if (!total) throw CustomError.badRequest("Missing total");

    return new ItemCartEntity(id, cartId, productId, quantity, total);
  }
}
