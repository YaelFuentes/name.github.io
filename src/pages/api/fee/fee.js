// import { db } from "@/core/services/databaseService";
import { FeeController } from '../../../core/controller/index.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const FeeId = parseInt(req.query.id);
        const Fee = await FeeController.getFeeById(FeeId);
        res.json(Fee);
      } else {
        const Fee = await FeeController.getAll();
        res.json(Fee);
      }
      break;
      case 'POST':
        const fieldsUpdate= req.body;
        const FeeId = await FeeController.createFee(fieldsUpdate);
        res.status(201).json(FeeId)
        break;
    /* case 'PUT':
      const clientId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await ClientController.updateClientById(clientId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const clientIds = parseInt(req.query.id);
      await ClientController.deleteClientById(clientIds);
      res.json({ success: true });
      break; */
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}