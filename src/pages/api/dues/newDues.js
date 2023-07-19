import { db } from "@/services/databaseService";

export default async function newDuesService(req, res) {
  const TABLE = 'dues';
  const { membershipNum, period, amount, month } = req.body;
  try {
    for (i = 0; i == month; i++) {
      let data = await db(TABLE)
        .insert({
          membershipNum: membershipNum,
          period: period,
          amount: amount
        })
    }
    res.status(200).json(data)
    /* const data = await db(TABLE)
      .insert(
        {
          membershipNum: membershipNum,
          period: period,
          amount: amount
        }
      );
    res.status(200).json(data); */
  } catch (err) {
    console.error('Error al obtener los datos: ', err);
    res.status(500).json({ err: 'Error al obtener los datos' });
  }
}