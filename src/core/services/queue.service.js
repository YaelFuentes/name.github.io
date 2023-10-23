import { db } from '../connection/databaseService';

class QueueService {
  constructor(id, membershipNum, patientName, queuecol, attention, date) {
    this.id = id;
    this.membershipNum = membershipNum;
    this.patientName = patientName;
    this.queuecol = queuecol;
    this.attention = attention;
    this.date = date;
  }

  async getById(id) {
    try {
      const queue = await db('queue').where('membershipNum', id).first();
      return queue;
    } catch (e) {
      console.error("Error fetching client by ID:", e)
      return null;
    }
  }

  async getAll() {
    try {
      const queue = await db("queue");
      return queue;
    } catch (e) {
      console.error("Error fetching all clients:", e);
      return [];
    }
  }

  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        db("queue").where("id", update.id).update(update)
      );

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error("Error updating client by IDs:", e);
      return false;
    }
  }

  async deleteByIds(ids) {
    try {
      await db("queue").whereIn("id", ids).del();
      return true;
    } catch (e) {
      console.error("Error deleting client by ID:", e);
      return false;
    }
  }
}
export default QueueService;