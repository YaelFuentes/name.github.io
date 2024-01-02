import { db } from '@/core/connection/databaseService'

class UserService {
  constructor(id, username, password, name, lastname, phone, userType) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.userType = userType
  }

  async getById(id) {
    try {
      const client = await db("users").where("id", id).first();
      return client;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  }
  async getAll() {
    try {
      const clients = await db("users");
      return clients;
    } catch (error) {
      console.error("Error fetching all users:", error);
      return [];
    }
  }
  async create(newUserData) {
    try {
      const newUserId = await db('users').insert(newUserData);
      return newUserId;
    } catch (error) {
      console.error('Error creating a new user:', error);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        await db("users").where("id", ids).update(updateObject);
      });

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error("Error updating user by IDs:", error);
      return false;
    }
  }
  async deleteByIds(ids) {
    try {
      await db("users").whereIn("id", ids).del();
      return true;
    } catch (error) {
      console.error("Error deleting user by ID:", error);
      return false;
    }
  }
}
export default UserService;