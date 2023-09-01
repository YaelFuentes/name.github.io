import MedicalShift from "../services/medical.service";

class MedicalController {
  static medicalService = new MedicalShift();
  static async getMedicalById(id){
    return await this.medicalService.getById(id);
  }

  static async getAllMedical(){
    return await this.medicalService.getAll();
  }

  static async udpateMedicalById(fieldsToUpdate){
    return await this.medicalService.updateByIds(fieldsToUpdate);
  }

  static async deleteMedicalById(ids) {
    return await this.medicalService.deleteByIds(ids);
  }
}

export default MedicalController;