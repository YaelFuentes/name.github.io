import PorductService from '../services/product.service.js';

class ProductController {
  static productService = new PorductService();

  static async getProductById(id) {
    return await this.productService.getById(id);
  }

  static async createProduct(productData) {
    return await this.productService.create(productData);
  }

  static async getAllProducts() {
    return await this.productService.getAll();
  }

  static async updateProductById(id, fieldsToUpdate) {
    return await this.productService.updateByIds(fieldsToUpdate);
  }

  static async deleteProductById(ids) {
    return await this.productService.deleteByIds(ids);
  }
}

export default ProductController;
