import { ProductController } from '../../../core/controller/index.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const productId = parseInt(req.query.id);
        const product = await ProductController.getProductById(productId);
        res.json(product);
      } else {
        const product = await ProductController.getAllProducts();
        res.json(product);
      }
      break;
    case 'PUT':
      const productId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await ProductController.updateProductById(productId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const productIds = parseInt(req.query.id);
      await ProductController.deleteProductById(productIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}