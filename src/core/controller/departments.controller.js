import { DepartmentService } from "../services";

class DepartmentController{
  static departmentService = new DepartmentService();
  static async getAllData(){
    return await this.departmentService.getAll();
  }
}
export default DepartmentController;