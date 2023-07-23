class DuesDetailsService {
  constructor(id, productId, productAmount, quantity) {
    this.id = id;
    this.productId = productId;
    this.productAmount = productAmount;
    this.quantity = quantity;
  }

  async getById(id) {
    try {
      const duesDetails = await knex("dues_details").where("id", id).first();
      return duesDetails;
    } catch (error) {
      console.error("Error fetching dues details by ID:", error);
      return null;
    }
  }

  async getAll() {
    try {
      const allDuesDetails = await knex("dues_details");
      return allDuesDetails;
    } catch (error) {
      console.error("Error fetching all dues details:", error);
      return [];
    }
  }

  async deleteByIds(ids) {
    try {
      await knex("dues_details").whereIn("id", ids).del();
      return true;
    } catch (error) {
      console.error("Error deleting dues details by IDs:", error);
      return false;
    }
  }

  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        knex("dues_details").where("id", update.id).update(update)
      );

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error("Error updating dues details by IDs:", error);
      return false;
    }
  }
}
export default DuesDetailsService;
