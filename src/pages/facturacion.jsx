import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import moment from 'moment'

const Facturacion = () => {
  const [formData, setFormData] = useState({
    lastModification: format(new Date(), 'yyyy-MM-dd'),
    amount: '',
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

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        <div className="p-4 ml-4 mt-4 bg-white rounded-lg shadow-md">
          <div className='font-bold text-xl text-center mb-4'>Panel de administración</div>
          <div className="mb-2">Actualizar el monto de la cuota</div>
          <div className="mb-2">Última actualización realizada el día {moment(lastValueFee.date).format('DD-MM-YYYY')}</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="date"
              name="lastModification"
              placeholder='Coloque fecha'
              value={formData.lastModification}
              required
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              name="value"
              placeholder={`Monto actual: $${lastValueFee.amount}`}
              value={formData.amount}
              required
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2"
            />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Guardar
            </button>
          </form>
          {/* <form>
            <div>Notificar a los usuarios via Email</div>
          </form> */}
        </div>
        <div className="p-4 mr-4 mt-4 bg-white rounded-lg shadow-md">
          <div className='font-bold text-xl text-center mb-4'>Panel de facturación</div>
          <div>
            <div className='text-lg m-2'>Monto total: $</div>
            <div className='text-lg m-2'>Monto total del mes: $</div>
            <div className='text-lg m-2'>Cobrazos en zona: $</div>
            <div>Godoy cruz: $</div>
            <div>Ciudad: $</div>
            <div>Las Heras: $</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Facturacion