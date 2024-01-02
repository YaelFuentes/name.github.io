import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'

const Facturacion = () => {
  const [formData, setFormData] = useState({
    lastModification: format(new Date(), 'yyyy-MM-dd'),
    value: '',
  })
  const [lastValueFee, setLastValueFee] = useState({})

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/fee/fee?id=1')
        setLastValueFee(response.data)
      } catch (e) {
        console.error('Error al recibir los fee: ', e)
      }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/fee/fee', formData)
      if (response.status === 200) {
        console.log('Nuevo monto de cuota creado')
      }
    } catch (e) {
      console.log('error', e)
    }
  }
  console.log(lastValueFee.value)

  return (
    <div>
      {/* <MapContainer centerCoords={coordinates}/> */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <div className='font-bold text-xl text-center m-4 p-2'>Panel de administracion</div>
          <div>Actualizar el monto de la cuota</div>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              name="lastModification"
              placeholder='Coloque fecha'
              value={formData.lastModification}
              required
              onChange={handleChange} />
            <input
              type="text"
              name="value"
              placeholder={`Monto actual: $${lastValueFee.value}`}
              value={formData.value}
              required
              onChange={handleChange} />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Guardar
            </button>
          </form>
        </div>
        <div>
          <div className='font-bold text-xl text-center m-4 p-2'>Panel de facturacion</div>
        </div>
      </div>

    </div>
  )
}

export default Facturacion