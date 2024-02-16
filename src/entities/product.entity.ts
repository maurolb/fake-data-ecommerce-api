export class ProductEntity {
  constructor(
    public id: number,
    public category: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public images?: string[]
  ) {}
}
