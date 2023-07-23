class ProductService {
  constructor(id, name, dateExpiration, price, quantity) {
    this.id = id;
    this.name = name;
    this.dateExpiration = dateExpiration;
    this.price = price;
    this.quantity = quantity;
  }

  async getById(id) {
    try {
      const product = await knex("products").where("id", id).first();
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }

  async getAll() {
    try {
      const allProducts = await knex("products");
      return allProducts;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  }

  async deleteByIds(ids) {
    try {
      await knex("products").whereIn("id", ids).del();
      return true;
    } catch (error) {
      console.error("Error deleting products by IDs:", error);
      return false;
    }
  }

  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        knex("products").where("id", update.id).update(update)
      );

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error("Error updating products by IDs:", error);
      return false;
    }
  }
}

export default ProductService;
