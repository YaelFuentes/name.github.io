import {db} from '../connection/databaseService.js';

class FeeService {
  constructor(id, amount, date) {
    this.id = id;
    this.amount = amount;
    this.date = date;
  }


  async getById(){
    try{
      const fee = await db("dues").orderBy("date", "desc").first()
      return fee
    }catch(e){
      console.error("Error fetching fee by ID: ", e)
      return null
    }
  }

  async create(newFee){
    try{
      const newFeeId = await db('dues').insert(newFee)
      return newFeeId
    }catch(e){
      console.error('Error creating a new Fee value:', e);
      return null
    }
  }

  async getAll(){
    try{
      const Fee = await db('dues')
      return Fee
    }catch(e){
      console.error("Error fetching all Fee Values:", e);
      return [];
    }
  }
}

export default FeeService;

