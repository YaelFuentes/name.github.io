import { EventsService } from '@/core/services'

class RecordatorioController{
  static recordatorioController = new EventsService();
  static async getAll(isSend){
    return await this.recordatorioController.getAll(isSend);
  }
  static async create(data){
    return await this.recordatorioController.create(data)
  }
}

export default RecordatorioController;