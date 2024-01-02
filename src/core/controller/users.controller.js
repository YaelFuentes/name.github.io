import UsersService from '@/core/services/users.service'

class UsersController {
  static userService = new UsersService();
  static async getUserById(id) {
    return await this.userService.getById(id);
  }

  static async createUser(clientData) {
    return await this.userService.create(clientData);
  }

  static async getAllUsers() {
    return await this.userService.getAll();
  }

  static async updateUserById(ids, fieldsToUpdate) {
    return await this.userService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteUserById(ids) {
    return await this.userService.deleteByIds(ids);
  }
}

export default UsersController;