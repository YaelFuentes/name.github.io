import { PatientController } from '../../../core/controller/index.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const patientId = parseInt(req.query.id);
        const patient = await PatientController.getById(patientId);
        res.json(patient)
      } else {
        const patients = await PatientController.getAllPatients();
        res.json(patients)
      }
      break;
    case 'PUT':
      const patientId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await PatientController.udpateClientById(patientId, fieldsToUpdate);
      res.json({ success: true })
      break;
    case 'DELETE' : 
    const patientIds = parseInt(req.query.id);
    await PatientController.deletePatientById(patientIds);
    res.json({success : true});
    break;
    default: 
    res.status(405).end(); // Method Not Allowed
    break;
  }
}