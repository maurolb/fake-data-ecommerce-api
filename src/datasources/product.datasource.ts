import { CreateProductDto } from "../dtos/product/create.product.dto";
import { UpdateImagesDto } from "../dtos/product/update.images.dto";
import { UpdateProductDto } from "../dtos/product/update.product.dto";
import { ProductEntity } from "../entities/product.entity";
import { CustomError } from "../errors/custom.error";
import { ProductMapper } from "../mappers/product.mapper";
import Product from "../models/product.model";

export class ProductDatasource {
  async getAll(): Promise<ProductEntity[]> {
    try {
      const productsDb = await Product.findAll();

      const products: ProductEntity[] = [];

      productsDb.forEach((product: Product) => {
        products.push(ProductMapper.productEntityFromObject(product));
      });

      return products;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getById(id: string): Promise<ProductEntity> {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw CustomError.notFound("Product not found");

      return ProductMapper.productEntityFromObject(product);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async deleteById(id: string): Promise<Object> {
    try {
      const product = await Product.findByPk(id);
      if (!product) throw CustomError.notFound("Product not found");

      await Product.destroy({ where: { id } });

      return { message: "Product deleted" };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { category, name, description, price, stock, images } =
      createProductDto;
    try {
      const product = await Product.create({
        category,
        name,
        description,
        price,
        stock,
        images,
      } as Product);

      return ProductMapper.productEntityFromObject(product);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async updateById(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const { id, category, name, description, price, stock } = updateProductDto;
    try {
      const productToUpdate: Product | null = await Product.findByPk(id);
      if (!productToUpdate) throw CustomError.notFound("Product not found");

      productToUpdate.category = category;
      productToUpdate.name = name;
      productToUpdate.description = description;
      productToUpdate.price = price;
      productToUpdate.stock = stock;

      await Product.update(productToUpdate.dataValues, {
        where: { id },
      });

      return ProductMapper.productEntityFromObject(productToUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async updateImages(updateImagesDto: UpdateImagesDto): Promise<ProductEntity> {
    const { id, images } = updateImagesDto;
    try {
      const productToUpdate: Product | null = await Product.findByPk(id);
      if (!productToUpdate) throw CustomError.notFound("Product not found");

      productToUpdate.category = productToUpdate.category;
      productToUpdate.name = productToUpdate.name;
      productToUpdate.description = productToUpdate.description;
      productToUpdate.price = productToUpdate.price;
      productToUpdate.stock = productToUpdate.stock;

      productToUpdate.images = images;

      await Product.update(productToUpdate.dataValues, {
        where: { id },
      });

      return ProductMapper.productEntityFromObject(productToUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
