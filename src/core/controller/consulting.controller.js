import ConsultingService from '../services/consulting.service';

class ConsultingController {
  static consultingService = new ConsultingService();
  static async getClientById(id) {
    return await this.consultingService.getById(id);
  }

  static async getAllClients() {
    return await this.consultingService.getAll();
  }

  static async updateClientById(fieldsToUpdate) {
    return await this.consultingService.updateByIds(fieldsToUpdate);
  }

  static async deleteClientById(ids) {
    return await this.consultingService.deleteByIds(ids);
  }
}

export default ConsultingController;
