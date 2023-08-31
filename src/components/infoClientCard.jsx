import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InfoClientCard = ({ id }) => {
  const [client, setClient] = useState([]);
  const [patient, setPatient] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/clients/client?id=${id}`);
        const data = response.data;
        setClient(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData()
  }, [id])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/patients/patient?id=${id}`);
        const data = response.data;
        setPatient(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [id])
  return (
    <div>
      <div>
        <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4'>
          <h3 className='font-bold text-lg text-black'>Nro de socio : <span>{client.membershipNum}</span></h3>
          <h3 className='font-bold text-lg'>{client.lastname}, {client.name}</h3>
          <h3 >Metodo de cobro : &nbsp;
            <span className='font-bold'>
              {client.PayMethod == 1 ? 'Local' : 'Cobrador'}
            </span>
          </h3>
        </div>
        <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
          <h3 >Domicilio : <span className='font-bold text-sm text-black'>{client.address}, {client.location}, {client.city}</span></h3>
          <h3>email : <p className='font-bold text-sm text-black'>{client.email}</p></h3>
          <h3>Telefono : <p className='font-bold text-sm text-black'>{client.phone}</p></h3>
        </div>
      </div>
      <div>
        <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4 mt-6'>
          <h3 className=''>
            Nombre Mascota : &nbsp;
            <span className='font-bold'>
              {patient.name}
            </span>
          </h3>
          <h3>
            Raza : &nbsp;
            <span className='font-bold'>
              {patient.race}
            </span>
          </h3>

        </div>
        <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
          <h3>
            Sub Raza : &nbsp; <span className='font-bold'>{patient.subRace ? patient.subRace : ' - '}</span>
          </h3>
          <h3>Tamaño : <span className='font-bold'>{patient.size}</span></h3>
          <h3>Color : <span className='font-bold'>{patient.color}</span></h3>
          <h3>Genero : <span className='font-bold'>{patient.gender}</span></h3>
          <h3>Numero de identificacion : <span className='font-bold'>{patient.identification ? patient.identification : ' - '}</span></h3>
        </div>
      </div>
    </div>
  )
}

export default InfoClientCard