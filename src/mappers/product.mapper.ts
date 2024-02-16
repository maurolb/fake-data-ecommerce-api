import { ProductEntity } from "../entities/product.entity";
import { CustomError } from "../errors/custom.error";

export class ProductMapper {
  static productEntityFromObject(object: { [key: string]: any }) {
    const { id, category, name, description, price, stock, images } = object;

    if (!id) throw CustomError.badRequest("Missing id");
    if (!category) throw CustomError.badRequest("Missing category");
    if (!name) throw CustomError.badRequest("Missing name");
    if (!description) throw CustomError.badRequest("Missing description");
    if (!price) throw CustomError.badRequest("Missing price");
    if (!stock) throw CustomError.badRequest("Missing stcok");

    return new ProductEntity(
      id,
      category,
      name,
      description,
      price,
      stock,
      images
    );
  }
}
