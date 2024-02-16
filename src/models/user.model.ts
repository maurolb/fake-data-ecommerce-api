import { Table, Column, Model, DataType, HasOne } from "sequelize-typescript";
import Cart from "./cart.model";

@Table
export default class User extends Model<User> {
  @Column({ unique: true })
  email!: string;

  @Column
  password!: string;

  @Column
  name!: string;

  @Column
  lastname!: string;

  @Column
  address!: string;

  @Column
  phone!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    allowNull: false,
  })
  role!: number;

  @Column
  image!: string;

  // @HasMany(() => Order)
  // history!: Order[];

  @HasOne(() => Cart, { onDelete: "CASCADE" })
  cart!: Cart;
}
