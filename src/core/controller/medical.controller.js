import MedicalShift from "../services/medical.service";

class MedicalController {
  static medicalService = new MedicalShift();
  static async getMedicalById(id){
    return await this.medicalService.getById(id);
  }

  static async createMedicalById(newData){
    return await this.medicalService.create(newData)
  }

  static async getAllMedical(){
    return await this.medicalService.getAll();
  }

  static async udpateMedicalById(clientId, fieldsToUpdate){
    return await this.medicalService.updateByIds(clientId, fieldsToUpdate);
  }

  static async deleteMedicalById(ids) {
    return await this.medicalService.deleteByIds(ids);
  }
}

export default MedicalController;