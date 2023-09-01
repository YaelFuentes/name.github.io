import {db} from '../connection/databaseService.js';
class ClientService {
  constructor(id, membershipNum, entryTime) {
    this.id = id;
    this.membershipNum = membershipNum;
    this.entryTime = entryTime;
  }

  async getById(id) {
    try {
      const client = await db("consulting").where("membershipNum", id).first();
      return client;
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      return null;
    }
  }

  async getAll() {
    try {
      const clients = await db("consulting");
      return clients;
    } catch (error) {
      console.error("Error fetching all clients:", error);
      return [];
    }
  }

  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        db("consulting").where("id", update.id).update(update)
      );

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error("Error updating client by IDs:", error);
      return false;
    }
  }

  async deleteByIds(ids) {
    try {
      await db("consulting").whereIn("id", ids).del();
      return true;
    } catch (error) {
      console.error("Error deleting client by ID:", error);
      return false;
    }
  }
}
export default ClientService;
