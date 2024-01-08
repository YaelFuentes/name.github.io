import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import useUser from '@/lib/useUser';

const NewHistorys = ({ namePatient, membershipNum }) => {
  const [formData, setFormData] = useState({});
  const { user, loading } = useUser();

  if (loading) {
    // Render loading state or a loading spinner
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataSend = {
        ...formData,
        date: moment().format('YYYY/MM/DD'),
        patientName: namePatient,
        membershipNum: membershipNum,
        doctor: user?.username || '', // Use optional chaining to avoid errors if user is undefined
      };

      const response = await axios.post('/api/shift/medical', dataSend);

      if (response.status === 200) {
        console.log('Nuevo registro de historia médica creado');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Día de la atención: {moment().format('DD/MM/YYYY')}</h1>
          <h1>Atendido por: {user?.username || ''}</h1>
          <div>
            <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Razón:
            </label>
            <input
              type="text"
              name="reason"
              className="input-field" // Customize styles as needed
              placeholder="Ej. consulta"
              required
              onChange={handleChange}
            />
          </div>

          <label htmlFor="history" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Consulta:
          </label>
          <textarea
            name="history"
            rows="4"
            className="input-field" // Customize styles as needed
            placeholder="Escriba el motivo de la consulta..."
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="button">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default NewHistorys;
