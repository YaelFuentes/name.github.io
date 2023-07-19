import React, { useEffect, useState } from 'react'
import TableResponsive from '@/components/table'
import axios from 'axios'

const Mercaderia = () => {
  const [client, setClient] = useState([]);

  const headers = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'description', label: 'Descripcion', minWidth: 100 },
    { id: 'price', label: 'Precio Particular', minWidth: 100 },
    { id: 'priceMembership', label: 'Precio Socio', minWidth: 100 },
    { id: 'supplier', label: 'Proveedor', minWidth: 100 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products/getProducts');
        setClient(response.data)
        if (response.status === 200) {
          console.log('success')
        } else {
          console.error('Error al ingresar los datos')
        }
      } catch (e) {
        console.error('Error al ingresar los datos: ', e)
      }
    }
    fetchData();
  }, [])
  console.log(client)
  return (
    <>
      <TableResponsive columns={headers} rows={client} />
    </>
  )
}

export default Mercaderia