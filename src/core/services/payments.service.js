import { db } from '@/core/connection/databaseService'

class PaymentsService {
  constructor(id, membershipNum, idDues, date, amountPay) {
    this.id = id;
    this.membershipNum = membershipNum;
    this.idDues = idDues;
    this.date = date;
    this.amountPay = amountPay;
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
  async getAll(startDate, endDate) {
    try {
      const data = await db('payments')
      .select('departments')
      .sum('amountPay as totalAmount')
      .whereBetween('date', [startDate, endDate])
      .groupBy('departments');
      return data
    } catch (e) {
      console.error("Error fetching payments by ID:", e);
      return null;
    }
  }
  async create(newData) {
    try {
      const newPay = await db('payments').insert(newData)
      return newPay
      return
    } catch (e) {
      console.error("Error fetching payments by ID:", e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        await db("payments").where("membershipNum", ids).update(updateObject);
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error("Error fetching payments by ID:", e);
      return null;
    }
  }
}

export default PaymentsService;