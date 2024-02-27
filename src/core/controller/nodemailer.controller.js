import { EventsService } from '@/core/services'

class NodemailerController {
  static eventService = new EventsService();
  static async sendReminder(mailOptions){
    return await this.eventService.notificationMail(mailOptions)
  }
  static async getAll(isSend){
    return await this.eventService.getAll(isSend);
  }
}

export default NodemailerController;