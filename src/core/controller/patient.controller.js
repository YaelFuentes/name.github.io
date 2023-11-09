import PatientService from "../services/patient.service";

class PatientController {
  static PatientService = new PatientService();
  static async getPatientById(id){
    return await this.PatientService.getById(id);
  }

  static async createPatient(patientData){
    return await this.PatientService.create(patientData);
  }

  static async  getAllPatients(){
    return await this.PatientService.getAll();
  }

  static async udpateClientById(ids, fieldsToUpdate){
    return await this.PatientService.updateByIds(ids, fieldsToUpdate)
  }

  static async deletePatientById(ids){
    return await this.PatientService.deleteByIds(ids)
  }
}

export default PatientController;