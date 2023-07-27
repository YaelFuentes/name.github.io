import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InfoClientCard = ({ id }) => {
  const [client, setClient] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/clients/getClientById?id=${id}`);
        const data = response.data;
        setClient(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData()
  }, [id])
  console.log(client)
  return (
    <div>
      {client.map(i => {
        return (
          <div>
            <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4'>
              <h3 className='font-bold text-lg text-black'>Nro de socio : <span>{i.membershipNum}</span></h3>
              <h3 className='font-bold text-lg'>{i.lastname}, {i.name}</h3>
              <h3 >Metodo de cobro : {i.PayMethod == 1 ? 'Local' : 'Cobrador'}</h3>
            </div>
            <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4'>
              <h3 >Domicilio : <span className='font-bold text-sm text-black'>{i.address}, {i.location}, {i.city}</span></h3>
              <h3>email : <p className='font-bold text-sm text-black'>{i.email}</p></h3>
              <h3>Telefono : <p className='font-bold text-sm text-black'>{i.phone}</p></h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InfoClientCard