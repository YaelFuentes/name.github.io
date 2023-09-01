import { db } from '../connection/databaseService.js';

class MedicalShift {
  constructor(id, membershipNum, patientName, history, date, responsible, reason) {
    this.id = id;
    this.membershipNum = membershipNum;
    this.patientName = patientName;
    this.history = history;
    this.date = date;
    this.responsible = responsible;
    this.reason = reason;
  }

  async getById(id) {
    try {
      const medical = await db('historys').where('membershipNum', id).first();
      return medical
    } catch (err) {
      console.error('Error fetching client by ID:', err)
      return null;
    }
  }

  async getAll() {
    try {
      const medical = await db("historys");
      return medical
    } catch (err) {
      console.error("Error fetching all clients:", err)
      return []
    }
  }

  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        db("historys").where("id", update.id).update(update)
      );
      await Promise.all(promises);
      return true;
    } catch (err) {
      console.error("Error updating client by IDs:", err);
      return false
    }
  }

  async deleteByIds(ids){
    try{
      await db("historys").whereIn("id", ids).del();
      return true
    }catch(err){
      console.error("Error deleting client by ID:", err)
      return false
    }
  }
}

export default MedicalShift;