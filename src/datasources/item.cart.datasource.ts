import { CreateItemCartDto } from "../dtos/item-cart/create.item.cart";
import { UpdateItemCartDto } from "../dtos/item-cart/update.item.cart";
import { ItemCartEntity } from "../entities/item.cart.entity";
import { CustomError } from "../errors/custom.error";
import { ItemCartMapper } from "../mappers/item.cart.mapper";
import Cart from "../models/cart.model";
import ItemCart from "../models/itemcart.model";
import Product from "../models/product.model";

export class ItemCartDatasource {
  async getAll(): Promise<ItemCartEntity[]> {
    try {
      const cartsDb = await ItemCart.findAll();

      const carts: ItemCartEntity[] = [];

      cartsDb.forEach((itemCart: ItemCart) => {
        carts.push(ItemCartMapper.itemCartEntityFromObject(itemCart));
      });

      return carts;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getAllByUserId(id: number): Promise<ItemCartEntity[]> {
    try {
      const cartsDb = await ItemCart.findAll({ where: { cartId: id } });

      const carts: ItemCartEntity[] = [];

      cartsDb.forEach((itemCart: ItemCart) => {
        carts.push(ItemCartMapper.itemCartEntityFromObject(itemCart));
      });

      return carts;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getById(id: string): Promise<ItemCartEntity> {
    try {
      const itemCart = await ItemCart.findByPk(id);
      if (!itemCart) throw CustomError.notFound("Item cart not found");

      return ItemCartMapper.itemCartEntityFromObject(itemCart);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async create(createItemCartDto: CreateItemCartDto): Promise<ItemCartEntity> {
    const { productId, quantity, uidFromToken } = createItemCartDto;
    let total = 0;

    try {
      // prueba que exista el cart
      const cart = await Cart.findOne({ where: { userId: uidFromToken } });
      if (!cart) throw CustomError.notFound("Cart not found");

      // Prueba que exita el producto
      const product = await Product.findByPk(productId);
      if (!product) throw CustomError.notFound("Product not found");

      // calcula el total
      total = product.price * quantity;

      const itemCart = await ItemCart.create({
        cartId: cart.id,
        productId,
        quantity,
        total,
      } as ItemCart);

      return ItemCartMapper.itemCartEntityFromObject(itemCart);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async updateById(
    updateItemCartDto: UpdateItemCartDto
  ): Promise<ItemCartEntity> {
    const { productId, quantity, uidFromToken, id } = updateItemCartDto;
    let total = 0;

    try {
      // busca si existe itemcart con el id del path
      const itemCartToUpdate = await ItemCart.findByPk(id);
      if (!itemCartToUpdate) throw CustomError.notFound("Item cart not found");

      // busca si existe cart con el uid del token
      const cart = await Cart.findOne({ where: { userId: uidFromToken } });
      if (!cart) throw CustomError.notFound("Cart not found");

      // busca si exite el producto con el product id del body
      const product = await Product.findByPk(productId);
      if (!product) throw CustomError.notFound("Product not found");

      // calcula el total
      total = product.price * quantity;

      itemCartToUpdate.cartId = itemCartToUpdate.cartId;
      itemCartToUpdate.productId = productId;
      itemCartToUpdate.quantity = quantity;
      itemCartToUpdate.total = total;

      await ItemCart.update(itemCartToUpdate.dataValues, {
        where: { id },
      });

      return ItemCartMapper.itemCartEntityFromObject(itemCartToUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async deleteById(id: string): Promise<Object> {
    try {
      const itemCart = await ItemCart.findByPk(id);
      if (!itemCart) throw CustomError.notFound("Item cart not found");

      await ItemCart.destroy({ where: { id } });

      return { message: "Item cart deleted" };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
