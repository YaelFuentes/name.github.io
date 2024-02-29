import { db } from "../connection/databaseService";

class PaymentsService {
  constructor(id, membershipNum, idDues, date, amountPay, departments, created_at) {
    this.id = id;
    this.membershipNum = membershipNum;
    this.idDues = idDues;
    this.date = date;
    this.amountPay = amountPay;
    this.departments = departments;
    this.created_at = created_at;
  }

  async getById(id) {
    try {
      const client = await db("clients").where("membershipNum", id).first();
      const payments = await db('payments').where('membershipNum', id);

      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const currentDate = today.getDate();
      let dates = []
      if (payments.length > 0) {
        const ultimoPago = payments[payments.length - 1];
        const fechaUltimoPago = new Date(ultimoPago.date);
        const diferenciaMeses = (currentYear - fechaUltimoPago.getFullYear()) * 12 + currentMonth - (fechaUltimoPago.getMonth() + 1);
        const nuevaFecha = new Date(fechaUltimoPago);
        nuevaFecha.setMonth(nuevaFecha.getMonth() + diferenciaMeses + 1); // Sumamos 1 mes para ir al mes siguiente
        nuevaFecha.setDate(10); 
        
        dates.push({
          meses: diferenciaMeses,
          fechaUltimoPago: ultimoPago,
          fechaCreacion: null,
          fechaActual: today,
          proximaCuota: nuevaFecha
        });
      } else {
        const createdAt = new Date(client.created_at);
        const diferenciaMesesInpagos = (currentYear - createdAt.getFullYear()) * 12 + currentMonth - (createdAt.getMonth() + 1);
        const nuevaFecha = new Date(createdAt);
        nuevaFecha.setMonth(nuevaFecha.getMonth() + diferenciaMesesInpagos + 1); // Sumamos 1 mes para ir al mes siguiente
        nuevaFecha.setDate(10); // Establecemos el día 10
        dates.push({
          meses: diferenciaMesesInpagos,
          fechaUltimoPago: null,
          fechaCreacion: createdAt,
          fechaActual: today,
          nuevaFecha: nuevaFecha
        });
      }
      return dates
    } catch (error) {
      console.error("Error fetching pending dues by client:", error);
      return [];
    }
  }

  async getAll() {
    try {
      const allDuesDetails = await db("payments");
      return allDuesDetails;
    } catch (error) {
      console.error("Error fetching all dues details:", error);
      return [];
    }
  }
  async create(data) {
    try {
      const newPatientId = await db('payments').insert(data);
      return newPatientId;
    } catch (e) {
      console.error('Error creating a new payment:', e);
      return null;
    }
  }

  async deleteByIds(ids) {
    try {
      await db("payments").whereIn("id", ids).del();
      return true;
    } catch (error) {
      console.error("Error deleting dues details by IDs:", error);
      return false;
    }
  }

  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        db("payments").where("id", update.id).update(update)
      );

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error("Error updating dues details by IDs:", error);
      return false;
    }
  }
}
export default PaymentsService;
