// import { db } from "@/core/services/databaseService";
import { ConsultingController } from '../../../core/controller/index.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const clientId = parseInt(req.query.id);
        const client = await ConsultingController.getClientById(clientId);
        res.json(client);
      } else {
        const clients = await ConsultingController.getAllClients();
        res.json(clients);
      }
      break;
    case 'PUT':
      const clientId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await ConsultingController.updateClientById(clientId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const clientIds = parseInt(req.query.id);
      await ConsultingController.deleteClientById(clientIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
