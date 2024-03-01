import { PaymentsController } from '@/core/controller'

export default async function handles(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const Id = parseInt(req.query.id)
        const data = await PaymentsController.getById(Id)
        res.json(data)
      } else {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const data = await PaymentsController.getAll(startDate, endDate);
        res.json(data)
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const data = await PaymentsController.create(fieldsUpdate);
      res.status(201).json(data)
      break;
    case 'PUT':
      const Id = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await PaymentsController.updateByIds(Id, fieldsToUpdate);
      res.json({ success: true })
      break;
    case 'DELETE':
      const patientIds = parseInt(req.query.id);
      await PaymentsController.deletePatientById(patientIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}