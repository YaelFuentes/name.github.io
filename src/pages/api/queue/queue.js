import { QueueController } from "@/core/controller";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const queueId = parseInt(req.query.id);
        const queue = await QueueController.getQueueById(queueId);
        res.json(queue);
      } else {
        const queue = await QueueController.getAllQueue();
        res.json(queue);
      }
      break;
    case 'PUT':
      const queueId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await QueueController.updateQueueById(queueId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const queueIds = parseInt(req.query.id);
      await QueueController.deleteQueueById(queueIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}