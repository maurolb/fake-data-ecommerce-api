import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import ItemCart from "./itemcart.model";

@Table
export default class Product extends Model<Product> {
  @Column
  category!: string;

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  price!: number;

  @Column
  stock!: number;

  @Column(DataType.ARRAY(DataType.STRING))
  images!: string[];

  @HasMany(() => ItemCart)
  carts!: ItemCart[];
}
