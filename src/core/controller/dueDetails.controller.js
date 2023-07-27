import DueDetailsService from "../services/dueDetails.service.js";

class DuesDetailsController {
  static duesDetailsService = new DueDetailsService();
  static async getDuesDetailsById(id) {
    return await this.duesDetailsService.getById(id);
  }

  static async getAllDuesDetails() {
    return await this.duesDetailsService.getAll();
  }

  static async updateDuesDetailsById(fieldsToUpdate) {
    return await this.duesDetailsService.updateByIds(fieldsToUpdate);
  }

  static async deleteDuesDetailsById(ids) {
    return await this.duesDetailsService.deleteByIds(ids);
  }
}

export default DuesDetailsController;
