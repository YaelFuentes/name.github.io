import React, { useState } from 'react';
import Button from '../Mui/Button';

const NewPays = () => {
  const [formData, setFormData] = useState({});
  const [meses, setMeses] = useState(0);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const handleMesesChange = (e) => {
    const selectedMeses = parseInt(e.target.value, 10);
    setMeses(selectedMeses);
    setFormData({ ...formData, meses: selectedMeses });
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  };

  const calculateDueDate = () => {
    const newDate = new Date(currentDate.getTime());
    newDate.setMonth(currentDate.getMonth() + meses);
    return newDate.toDateString();
  };

  const insertDue = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/dues/newDues', formData)
      if (response.status == 200) {
        console.log('Deuda ingresada con exito')
      }
    } catch {
      console.error(response.data.message)
    }

  }

  return (
    <div className="p-4">
      <form onSubmit={insertDue}>
        <h1 className='text-center text-4xl py-4'>Generar deuda o adelanto</h1>
        <div className="mb-4">
          <label className="block mb-2">Número de Socio:</label>
          <input
            name='membershipNum'
            type="text"
            defaultValue={formData.membershipNumber}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Monto:</label>
          <input
            name='amount'
            type="text"
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Meses:</label>
          <select name="month" id="month" onChange={handleMesesChange}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month} mes(es)
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cobertura hasta :</label>
          <p>
            {/* {new Date(currentDate.setMonth(currentDate.getMonth() + formData.meses)).toDateString()} */}
            {calculateDueDate()}
          </p>
        </div>
        <Button name={'Cargar pago'} className='py-4 items-center text-center' />
      </form>
    </div>
  );
}
export default NewPays;