import { db } from "@/services/databaseService";

export default async function clientServiceFactory (req, res){
  const TABLE = 'clients';
  try{
    const data = await db(TABLE).select('*');
    res.status(200).json(data);
  }
  catch(err){
    console.error('Error al obtener los datos:', err);
    res.status(500).json({ err: 'Error al obtener los datos' });
  }
}