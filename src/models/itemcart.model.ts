import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Product from "./product.model";
import Cart from "./cart.model";

@Table
export default class ItemCart extends Model<ItemCart> {
  @ForeignKey(() => Cart)
  @Column
  cartId!: number;

  @BelongsTo(() => Cart)
  cart!: Cart;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @Column
  quantity!: number;

  @Column
  total!: number;
}
