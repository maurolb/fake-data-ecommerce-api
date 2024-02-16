import { ItemCartDatasource } from "../datasources/item.cart.datasource";
import { CreateItemCartDto } from "../dtos/item-cart/create.item.cart";
import { UpdateItemCartDto } from "../dtos/item-cart/update.item.cart";
import { ItemCartEntity } from "../entities/item.cart.entity";

export class ItemCartRepository {
  constructor(private readonly itemCartDatasource: ItemCartDatasource) {}

  getAll(): Promise<ItemCartEntity[]> {
    return this.itemCartDatasource.getAll();
  }

  getAllByUserId(id: number): Promise<ItemCartEntity[]> {
    return this.itemCartDatasource.getAllByUserId(id);
  }

  getById(id: string): Promise<ItemCartEntity> {
    return this.itemCartDatasource.getById(id);
  }

  create(createItemCartDto: CreateItemCartDto): Promise<ItemCartEntity> {
    return this.itemCartDatasource.create(createItemCartDto);
  }

  updateById(updateItemCartDto: UpdateItemCartDto): Promise<ItemCartEntity> {
    return this.itemCartDatasource.updateById(updateItemCartDto);
  }

  deleteById(id: string): Promise<Object> {
    return this.itemCartDatasource.deleteById(id);
  }
}
