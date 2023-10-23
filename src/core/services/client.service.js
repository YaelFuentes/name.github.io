import {db} from '../connection/databaseService.js';
class ClientService {
  constructor(id, membershipNum, name, lastname, phone, email, address, dni) {
    this.id = id;
    this.membershipNum = membershipNum;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.dni = dni;
  }

  async getById(id) {
    try {
      const client = await db("clients").where("membershipNum", id).first();
      return client;
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      return null;
    }
  }

  async getAll() {
    try {
      const clients = await db("clients");
      return clients;
    } catch (error) {
      console.error("Error fetching all clients:", error);
      return [];
    }
  }

  async create(newClientData) {
    try {
      const [newClientId] = await db('clients').insert(newClientData);
      return newClientId;
    } catch (error) {
      console.error('Error creating a new client:', error);
      return null;
    }
  }


  async updateByIds(updates) {
    try {
      const promises = updates.map((update) =>
        db("clients").where("id", update.id).update(update)
      );

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error("Error updating client by IDs:", error);
      return false;
    }
  }

  async deleteByIds(ids) {
    try {
      await db("clients").whereIn("id", ids).del();
      return true;
    } catch (error) {
      console.error("Error deleting client by ID:", error);
      return false;
    }
  }
}
export default ClientService;
