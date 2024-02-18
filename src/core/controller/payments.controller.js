import { PaymentsService } from '@/core/services'

class PaymentController {
  static PaymentService = new PaymentsService()
  static async getById(id) {
    return await this.PaymentService.getById(id)
  }
  static async getAll(startDate, endDate) {
    return await this.PaymentService.getAll(startDate, endDate);
  }
  static async updateByIds(ids, updates) {
    return await this.PaymentService.updateByIds(ids, updates)
  }
  static async create(newData) {
    return await this.PaymentService.create(newData)
  }
}
export default PaymentController;
