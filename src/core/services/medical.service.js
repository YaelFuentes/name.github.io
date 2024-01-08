import { db } from '../connection/databaseService.js';
import moment from 'moment'
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

      const medical = await db('historys').where('membershipNum', id);
      return medical
    } catch (err) {
      console.error('Error fetching client by ID:', err)
      return null;
    }
  }

  async create(newData) {
    try {
      const newClientId = await db('historys').insert(newData);
      return newClientId;
    } catch (e) {
      console.error('Error creating a new client:', e);
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

  async updateByIds(clientId, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          // Formatea la fecha si es la clave 'date'
          const formattedValue = key === 'date' ? moment(values[index]).format('YYYY-MM-DD') : values[index];
          return { ...acc, [key]: formattedValue };
        }, {});

        await db("historys").where("id", clientId).update(updateObject);
      });

      await Promise.all(promises);
      console.log('true');
      return true;
    } catch (err) {
      console.error("Error updating client by IDs:", err);
      return false
    }
  }

  async deleteByIds(ids) {
    try {
      await db("historys").where("id", ids).del();
      return true
    } catch (err) {
      console.error("Error deleting client by ID:", err)
      return false
    }
  }
}

export default MedicalShift;