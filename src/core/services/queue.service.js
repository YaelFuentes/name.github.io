import { db } from '../connection/databaseService.js';

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

  async create(newData) {
    try {
      // Consultar el número más alto actual de queuecol para el día actual
      const highestQueuecol = await db('queue')
        .where('date', '=', newData.date) // Asegúrate de que date esté en formato 'YYYY-MM-DD'
        .max('queuecol as maxQueuecol')
        .first();

        console.log(highestQueuecol)

      // Obtener el nuevo valor de queuecol incrementando el número más alto actual
      const newQueuecol = highestQueuecol.maxQueuecol !== null ? Number(highestQueuecol.maxQueuecol) + 1 : 1;


      // Añadir el nuevo valor de queuecol a los datos del cliente
      const clientDataWithQueuecol = {
        ...newData,
        queuecol: newQueuecol,
      };

      // Insertar los datos del cliente en la base de datos
      const newClientId = await db('queue').insert(clientDataWithQueuecol);

      return newClientId;
    } catch (e) {
      console.error('Error creating a new queue:', e);
      return null;
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