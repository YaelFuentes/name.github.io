class DueService {
  constructor(id, userId, date, amount) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.amount = amount;
  }

  async getById(id) {
    try {
      const dues = await knex("dues").where("id", id).first();
      return dues;
    } catch (error) {
      console.error("Error fetching dues by ID:", error);
      return null;
    }
  }

  async getAll() {
    try {
      const allDues = await knex("dues");
      return allDues;
    } catch (error) {
      console.error("Error fetching all dues:", error);
      return [];
    }
  }

  async deleteByIds(ids) {
    try {
      await knex("dues").whereIn("id", ids).del();
      return true;
    } catch (error) {
      console.error("Error deleting dues by IDs:", error);
      return false;
    }
  }

  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        knex("dues").where("id", update.id).update(update)
      );

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error("Error updating dues by IDs:", error);
      return false;
    }
  }
}
export default DueService;
