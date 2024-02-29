import {db} from '@/core/connection/databaseService'

class PaymentsService {
  constructor(id, membershipNum, idDues, date, amountPay){
    this.id = id;
    this.membershipNum = membershipNum;
    this.idDues = idDues;
    this.date = date;
    this.amountPay = amountPay;
  }
  async getById(){
    try{
      
    }catch(e){
      console.error("Error fetching payments by ID:", error);
      return null;
    }
  }
  async getAll(){
    try{
      
    }catch(e){
      console.error("Error fetching payments by ID:", error);
      return null;
    }
  }
  async create(newData){
    try{
      
    }catch(e){
      console.error("Error fetching payments by ID:", error);
      return null;
    }
  }
  async updateByIds(ids, updates){
    try{
      
    }catch(e){
      console.error("Error fetching payments by ID:", error);
      return null;
    }
  }
}