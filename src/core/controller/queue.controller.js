import QueueService from "../services/queue.service";

class QueueController {
  static QueueServices = new QueueService();
  static async getQueueById(id) {
    return await this.QueueServices.getById(id);
  }

  static async getAllQueue() {
    return await this.QueueServices.getAll();
  }

  static async postQueue(fieldsToUpdate){
    return await this.QueueServices.create(fieldsToUpdate)
  }

  static async updateQueueById(fieldsToUpdate) {
    return await this.QueueServices.updateByIds(fieldsToUpdate);
  }

  static async deleteQueueById(ids) {
    return await this.QueueServices.deleteByIds(ids);
  }
}

export default QueueController;