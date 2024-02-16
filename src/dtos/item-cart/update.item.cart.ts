export class UpdateItemCartDto {
  private constructor(
    public productId: number,
    public quantity: number,
    public uidFromToken: string,
    public id: string
  ) {}

  static update(
    itemCartId: string,
    object: { [key: string]: any }
  ): [string?, UpdateItemCartDto?] {
    const { productId, quantity, user } = object;

    const { id } = user;

    if (!itemCartId) return ["Missing item cart id"];
    if (!productId) return ["Missing product id"];
    if (typeof productId != "number")
      return ["ProductId value must be type number"];
    if (!quantity) return ["Missing quantity"];
    if (typeof quantity != "number")
      return ["Quantity value must be type number"];
    if (quantity < 1) return ["Quantity value can not be 0 or negative"];

    return [
      undefined,
      new UpdateItemCartDto(productId, quantity, id, itemCartId),
    ];
  }
}
