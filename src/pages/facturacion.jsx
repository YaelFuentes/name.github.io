import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'

const Facturacion = () => {
  const [formData, setFormData] = useState({
    lastModification: format(new Date(), 'yyyy-MM-dd'),
    value: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  })
  const [lastValueFee, setLastValueFee] = useState({})
  const [amounts, setAmounts] = useState({
    total: 0,
    payCity: 0,
    payLH: 0,
    payGC: 0,
  })
  const [departments, setDepartments] = useState([])

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  };
  console.log(formData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = {
          startDate: formData.startDate,
          endDate: formData.endDate
        }
        const response = await axios.get('/api/fee/fee?id=1')
        const amountPayments = await axios.get(`/api/payments/payments?startDate=${formData.startDate}&endDate=${formData.endDate}`, )
        const departments = await axios.get('/api/department/department')
        setDepartments(departments.data)
        setLastValueFee(response.data)
        const totalAmountsByDepartment = amountPayments.data.reduce((acc, payment) => {
          const department = payment.departments;
          const amountPay = payment.totalAmount || 0;

          if (!acc[department]) {
            acc[department] = 0;
          }

          acc[department] += amountPay;

          return acc;
        }, {});
        const totalAmount = Object.values(totalAmountsByDepartment).reduce(
          (total, amount) => total + amount,
          0
        );
        setAmounts({ 
          total: totalAmount, 
          payCity: totalAmountsByDepartment[2], 
          payLH: totalAmountsByDepartment[1],
          payGC: totalAmountsByDepartment[3]
        })
        console.log(totalAmount);
        console.log(totalAmountsByDepartment)
      } catch (e) {
        console.error('Error al recibir los fee: ', e)
      }
    }
    fetchData();
  }, [formData.startDate, formData.endDate])

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
              placeholder={`Monto actual: $${lastValueFee.amount}`}
              value={formData.value}
              required
              onChange={handleChange} />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Guardar
            </button>
          </form>
        </div>
        <div>
          <div className='font-bold text-xl text-center m-4 p-2'>
            Panel de facturacion
          </div>
          <div>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <div>
              Monto total de cuotas cobradas :  ${amounts.total}
            </div>
            <div>
              Monto total de Ciudad: ${amounts.payCity}
            </div>
            <div>
              Monto total de Las Heras: ${amounts.payLH}
            </div>
            <div>
              Monto total de Godoy Cruz: ${amounts.payGC}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Facturacion