import { MedicalController } from '../../../core/controller/index';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const clientId = parseInt(req.query.id);
        const medical = await MedicalController.getMedicalById(clientId);
        res.json(medical);
      } else {
        const medical = await MedicalController.getAllMedical();
        res.json(medical)
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const medicalCreate = await MedicalController.createMedicalById(fieldsUpdate)
      res.status(201).json(medicalCreate)
      break;
    case 'PUT':
      const clientId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await MedicalController.udpateMedicalById(clientId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const clientIds = parseInt(req.query.id);
      await MedicalController.deleteMedicalById(clientIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}