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
      const data = await db('payments').where('membershipNum', id)
      return data
    } catch (e) {
      console.error("Error fetching payments by ID:", e);
      return null;
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