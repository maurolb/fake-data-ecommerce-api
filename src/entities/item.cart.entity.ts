export class ItemCartEntity {
  constructor(
    public id: number,
    public cartId: number,
    public productId: number,
    public quantity: number,
    public total: number
  ) {}
}
