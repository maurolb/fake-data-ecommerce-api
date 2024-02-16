import { CartDatasource } from "../datasources/cart.datasource";
import { CartEntity } from "../entities/cart.entity";

export class CartRepository {
  constructor(private readonly cartDatasource: CartDatasource) {}

  getAll(): Promise<CartEntity[]> {
    return this.cartDatasource.getAll();
  }

  getById(id: string): Promise<CartEntity> {
    return this.cartDatasource.getById(id);
  }

  getByUserId(userId: string): Promise<CartEntity> {
    return this.cartDatasource.getByUserId(userId);
  }
}
