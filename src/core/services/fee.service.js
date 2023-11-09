import {db} from '../connection/databaseService.js';

class FeeService {
  constructor(id, value, lastModification) {
    this.id = id;
    this.value = value;
    this.lastModification = lastModification;
  }


  async getById(){
    try{
      const fee = await db("fee").orderBy("lastModification", "desc").first()
      return fee
    }catch(e){
      console.error("Error fetching fee by ID: ", e)
      return null
    }
  }

  async create(newFee){
    try{
      const newFeeId = await db('fee').insert(newFee)
      return newFeeId
    }catch(e){
      console.error('Error creating a new Fee value:', e);
      return null
    }
  }

  async getAll(){
    try{
      const Fee = await db('fee')
      return Fee
    }catch(e){
      console.error("Error fetching all Fee Values:", e);
      return [];
    }
  }
}

export default FeeService;

