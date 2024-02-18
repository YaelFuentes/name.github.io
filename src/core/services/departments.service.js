import { db } from '@/core/connection/databaseService'

class DepartmentService{
  constructor(id, name){
    this.id = id
    this.name = name
  }
  async getAll(){
    try{
      const data = await db('departments')
      return data
    }catch(e){
      console.log(`Error: ${e}`)
    }
  }
}
export default DepartmentService;