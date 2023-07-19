import { db } from '@/services/databaseService'

export default async function newProductService(req, res) {
  const TABLE = 'products';
  const {name, description, price, priceMembership, supplier} = req.body
  try{
    const data = await db(TABLE)
    .insert({
      name: name,
      description: description,
      price: price,
      priceMembership: priceMembership,
      supplier: supplier
    })
    res.status(200).json(data)
  }catch(err){
    console.error('Error al obtener los datos: ', err)
    res.status(500).json({err: 'Error al obtener los datos'})
  }
}