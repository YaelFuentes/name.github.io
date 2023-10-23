import ClientService from '../services/client.service';

class ClientController {
  static clientService = new ClientService();
  static async getClientById(id) {
    return await this.clientService.getById(id);
  }

  static async createClient(clientData) {
    return await this.clientService.create(clientData);
  }

  static async getAllClients() {
    return await this.clientService.getAll();
  }

  static async updateClientById(fieldsToUpdate) {
    return await this.clientService.updateByIds(fieldsToUpdate);
  }

  static async deleteClientById(ids) {
    return await this.clientService.deleteByIds(ids);
  }
}

export default ClientController;
