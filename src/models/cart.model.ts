import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import User from "./user.model";
import ItemCart from "./itemcart.model";

@Table
export default class Cart extends Model<Cart> {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user!: User;

  @HasMany(() => ItemCart)
  items!: ItemCart[];
}
