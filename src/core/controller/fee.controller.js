import FeeService from '../services/fee.service';

class FeeController {
  static FeeServices = new FeeService();
  static async getFeeById(id) {
    return await this.FeeServices.getById(id);
  }

  static async createFee(feeData) {
    return await this.FeeServices.create(feeData);
  }

  static async getAllClients() {
    return await this.FeeServices.getAll();
  }

/*   static async updateClientById(fieldsToUpdate) {
    return await this.FeeServices.updateByIds(fieldsToUpdate);
  } */

/*   static async deleteClientById(ids) {
    return await this.FeeServices.deleteByIds(ids);
  } */
}

export default FeeController;
