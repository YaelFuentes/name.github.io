import { db } from '@/services/databaseService'

export default async function clientUpdateServiceFactory(req, res) {
  const TABLE = 'clients';
  const { id, membershipNum, name, lastname, phone, address, dni, email } = req.body
  try {
    const data = await db(TABLE).update({
      membershipNum: membershipNum,
      name: name,
      lastname: lastname,
      phone: phone,
      address: address,
      email: email,
      dni: dni
    }).where({ id })
    res.status(200).json(data)
  }
  catch (err) {
    console.error('Error al obtener los datos: ', err);
    res.status(500).json({ err: 'Error al obtener los datos' })
  }
}