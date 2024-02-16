import ItemCart from "../models/itemcart.model";

export class CartEntity {
  constructor(
    public id: number,
    public userId: number,
    public items?: ItemCart[]
  ) {}
}
