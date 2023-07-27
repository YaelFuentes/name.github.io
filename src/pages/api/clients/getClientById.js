import { db } from "@/services/databaseService";

export default async function clientServiceFactoryById(req, res) {
  const TABLE = 'clients';
  const { id } = req.query
  try {
    const data = await db(TABLE).where('membershipNum', id).select('*')
    res.status(200).json(data);
  } catch (err) {
    console.error('Error al obtener los datos:', err);
    res.status(500).json({ err: 'Error al obtener los datos' });
  }
}