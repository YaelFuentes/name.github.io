import { PaymentsController } from "@/core/controller";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        const paymentId = parseInt(req.query.id);
        const payment = await PaymentsController.getDuesDetailsById(paymentId)
        res.json(payment);
      } else {
        const payments = await PaymentsController.getAllDuesDetails();
        res.json(payments);
      }
      break;
    case "POST":
      const fieldsUpdate = req.body;
      const client = await PaymentsController.createPayments(fieldsUpdate);
      res.status(201).json(client)
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
  }
}