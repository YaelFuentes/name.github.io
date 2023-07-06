import React, { useState, useEffect } from 'react';
import Button from '../Mui/Button';

const NewPays = () => {
  const [monto, setMonto] = useState('');
  const [meses, setMeses] = useState(1);
  const [anio, setAnio] = useState('');
  const [id, setId] = useState('');
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const handleMontoChange = (e) => {
    setMonto(e.target.value);
  };

  const handleMesesChange = (e) => {
    const selectedMeses = parseInt(e.target.value, 10);
    setMeses(selectedMeses);
    const newDate = new Date(currentDate.getTime());
    newDate.setMonth(currentDate.getMonth() + selectedMeses);
    setAnio(newDate.getFullYear().toString());
  };

  const handleAnioChange = (e) => {
    setAnio(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const insertDue = (e) => {
    e.preventDefault();
    
  }

  return (
    <div className="p-4">
      <form onSubmit={insertDue}>
        <h1 className='text-center text-4xl py-4'>Generar deuda o adelanto</h1>
        <div className="mb-4">
          <label className="block mb-2">Número de Socio:</label>
          <input
            type="text"
            value={id}
            onChange={handleIdChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Monto:</label>
          <input
            type="text"
            value={monto}
            onChange={handleMontoChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Meses:</label>
          <select
            value={meses}
            onChange={handleMesesChange}
            className="border rounded px-2 py-1 w-full"
          >
            <option value={1}>1 mes</option>
            <option value={2}>2 meses</option>
            <option value={3}>3 meses</option>
            {/* Agregar más opciones si es necesario */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Fecha:</label>
          <p>
            {new Date(currentDate.setMonth(currentDate.getMonth() + meses)).toDateString()}
          </p>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Año:</label>
          <input
            type="text"
            value={anio}
            onChange={handleAnioChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <Button name={'Cargar pago'} className='py-4 items-center text-center'/>
      </form>
    </div>
  );
}
export default NewPays;