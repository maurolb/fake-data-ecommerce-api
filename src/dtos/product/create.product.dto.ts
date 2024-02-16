export class CreateProductDto {
  private constructor(
    public category: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public images: string[] = []
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { category, name, description, price, stock } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!category) return ["Missing category"];
    if (!price) return ["Missing price"];
    if (typeof price != "number") return ["Price value must be type number"];
    if (price < 1) return ["Price value can not be 0 or negative"];
    if (!stock) return ["Missing stock"];
    if (typeof stock != "number") return ["Stock value must be type number"];
    if (stock < 0) return ["Stock value can not be negative"];

    return [
      undefined,
      new CreateProductDto(category, name, description, price, stock),
    ];
  }
}
