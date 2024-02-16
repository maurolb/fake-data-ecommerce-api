import { ProductDatasource } from "../datasources/product.datasource";
import { CreateProductDto } from "../dtos/product/create.product.dto";
import { UpdateImagesDto } from "../dtos/product/update.images.dto";
import { UpdateProductDto } from "../dtos/product/update.product.dto";
import { ProductEntity } from "../entities/product.entity";

export class ProductRepository {
  constructor(private readonly productDatasource: ProductDatasource) {}

  getAll(): Promise<ProductEntity[]> {
    return this.productDatasource.getAll();
  }

  getById(id: string): Promise<ProductEntity> {
    return this.productDatasource.getById(id);
  }

  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productDatasource.create(createProductDto);
  }

  updateById(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return this.productDatasource.updateById(updateProductDto);
  }

  updateImagesById(updateImagesDto: UpdateImagesDto): Promise<ProductEntity> {
    return this.productDatasource.updateImages(updateImagesDto);
  }

  deleteById(id: string): Promise<Object> {
    return this.productDatasource.deleteById(id);
  }
}
