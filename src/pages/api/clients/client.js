// import { db } from "@/core/services/databaseService";
import { ClientController } from '../../../core/controller/index.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const clientId = parseInt(req.query.id);
        const client = await ClientController.getClientById(clientId);
        res.json(client);
      } else {
        const clients = await ClientController.getAllClients();
        res.json(clients);
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const client = await ClientController.createClient(fieldsUpdate);
      res.status(201).json(client)
      break;
    case 'PUT':
      const clientId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await ClientController.updateClientById(clientId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const clientIds = parseInt(req.query.id);
      await ClientController.deleteClientById(clientIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

// export default async function clientServiceFactory (req, res){
//   const TABLE = 'clients';
//   try{
//     const data = await db(TABLE).select('*');
//     res.status(200).json(data);
//   }
//   catch(err){
//     console.error('Error al obtener los datos:', err);
//     res.status(500).json({ err: 'Error al obtener los datos' });
//   }
// }

/* case 'POST':
      const fieldsUpdate= req.body;
      const client = await ClientController.postClient(fieldsUpdate);
      res.json(client)
      break; */