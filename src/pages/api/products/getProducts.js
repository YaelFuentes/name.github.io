import { db } from '@/core/connection/databaseService'

export default async function productUpdateServiceFactory(req, res) {
  const TABLE = 'products'
  try {
    const data = await db(TABLE).select('*')
    res.status(200).json(data);
  } catch (e) {
    console.error('Error al obtener los datos:', e);
    res.status(500).json({ e: 'Error al obtener los datos' });
  }
}