import PaymentsService from "../services/payments.service.js";

class PaymentsController {
  static paymentsService = new PaymentsService();
  static async getDuesDetailsById(id) {
    return await this.paymentsService.getById(id);
  }

  static async getAllDuesDetails() {
    return await this.paymentsService.getAll();
  }
  static async createPayments(data) {
    return await this.paymentsService.create(data);
  }

  static async updateDuesDetailsById(fieldsToUpdate) {
    return await this.paymentsService.updateByIds(fieldsToUpdate);
  }

  static async deleteDuesDetailsById(ids) {
    return await this.paymentsService.deleteByIds(ids);
  }
}

export default PaymentsController;
