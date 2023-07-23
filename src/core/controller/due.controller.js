import DueService from '../services/due.service.js';

class DuesController {
  static dueService = new DueService();
  
  static async getDuesById(id) {
    return await this.dueService.getById(id);
  }

  static async getAllDues() {
    return await this.dueService.getAll();
  }

  static async updateDuesById(fieldsToUpdate) {
    return await this.dueService.updateByIds(fieldsToUpdate);
  }

  static async deleteDuesById(ids) {
    return await this.dueService.deleteByIds(ids);
  }
}

export default DuesController;
