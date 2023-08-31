import { db } from "@/services/databaseService";

export default async function newClientServiceFactory(req, res) {
  const TABLE = 'clients';
  const TABLEPET = 'patients';
  const {
    membershipNum,
    name,
    lastname,
    phone,
    address,
    dni,
    location,
    email,
    namePet,
    racePet,
    subRacePet,
    sizePet,
    colorPet,
    genderPet } = req.body;
  try {
    const data = await db(TABLE)
      .insert({
        membershipNum: membershipNum,
        name: name,
        lastname: lastname,
        phone: phone,
        address: address,
        location: location,
        email: email,
        dni: dni
      });
    const dataPet = await db(TABLEPET)
      .insert({
        membershipNum: membershipNum,
        name: namePet,
        race: racePet,
        subRace: subRacePet,
        color: colorPet,
        size: sizePet,
        gender: genderPet
      })
    res.status(200).json(data, dataPet);
  } catch (err) {
    console.error('Error al obtener los datos: ', err);
    res.status(500).json({ err: 'Error al obtener los datos' });
  }
}