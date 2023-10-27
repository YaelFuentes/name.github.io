import {db} from '../connection/databaseService.js'

class PatientService {
  constructor(id , membershipNum, name, race, subRace, identification, size, color, gender, patientscol){
    this.id = id;
    this.membershipNum = membershipNum;
    this.namePatient = name;
    this.race = race;
    this.subRace = subRace;
    this.identification = identification;
    this.size = size;
    this.color = color;
    this.gender = gender;
    this.patientscol = patientscol;
  }

  async getById(membershipNum){
    try{
      const patient = await db("patients").where("membershipNum", membershipNum).first();
      return patient
    }catch(error){
      console.error("Error fetching patient by ID: ", error);
      return null
    }
  }

  async create(newPatientData) {
    try {
      const newPatientId = await db('patients').insert(newPatientData);
      return newPatientId;
    } catch (error) {
      console.error('Error creating a new patient:', error);
      return null;
    }
  }

  async getAll(){
    try{
      const patient = await db("patients");
      return patient
    }catch(error){
      console.error("Error  fetching all patient: ", error)
    }
  }
  async updateByIds(updates){
    try{
      const promises = updates.map((update) => 
      db("patients").where("id", update.id).update(update)
      );
      await Promise.all(promises)
      return true
    }catch(error){
      console.error("Error updating patient by IDs: ", error)
      return false
    }
  }
  async deleteByIds(ids){
    try{
      await db("patients").whereIn("id", ids).del();
      return true
    }catch(error){
      console.error("Error deleting patient by ID: ", error)
      return false
    }
  }
}
export default PatientService;

