import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlertCheck from '../Flowbite/alertCheck';
import getRangeMessage from './functions/getRange';
import getMonthName from './functions/monthName';
import Button from '../Mui/Button';

const DuesPay = ({ id }) => {
  const [data, setData] = useState({
    cuotas: [],
    status: null,
    loading: true,
    mesAdeudado: null,
    mesInicio: null,
    mesFin: null,
    añoActual: null,
    añoInicio: null,
  });
  const [formData, setFormData] = useState({});
  const [duesPay, setDuesPay] = useState([]);
  const [client, setClient] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);

  const fechas = data.cuotas.map(cuota => new Date(cuota.date));
  fechas.sort((a, b) => b - a);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/payments/payments?id=${id}`);
        const clientResponse = await axios.get(`/api/clients/client?id=${id}`)
        const dues = await axios.get(`/api/fee/fee?id=1`)
        setDuesPay(dues.data)
        setClient(clientResponse.data)
        setData({ ...data, cuotas: response.data, loading: false });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!data.loading && client) {
      const clientCreatedAt = new Date(client.created_at);
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();

      const { status, mesInicio, mesFin, añoInicio, añoActual, mesAdeudado } = getPaymentStatus(data.cuotas, clientCreatedAt.getMonth(), clientCreatedAt.getFullYear(), month, year, clientCreatedAt);

      if (
        status !== data.status ||
        mesInicio !== data.mesInicio ||
        mesFin !== data.mesFin ||
        añoInicio !== data.añoInicio ||
        añoActual !== data.añoActual ||
        mesAdeudado !== data.mesAdeudado
      ) {
        setData({
          ...data,
          status,
          mesInicio,
          mesFin,
          añoInicio,
          añoActual,
          mesAdeudado,
        });
      }
    }
  }, [data, client]);

  function getPaymentStatus(cuotas, clientStartMonth, clientStartYear, currentMonth, currentYear, clientCreatedAt) {
    if (cuotas.length === 0) {
      const today = new Date();
      const daysSinceCreated = Math.floor((today - new Date(clientStartYear, clientStartMonth, 1)) / (1000 * 60 * 60 * 24));
      if (daysSinceCreated <= 30) {
        return { status: 1, mesInicio: clientStartMonth + 1, añoInicio: clientStartYear, mesFin: currentMonth, añoActual: currentYear };
      } else if (daysSinceCreated >= 30 && daysSinceCreated <= 59) {
        return { status: 4, mesInicio: clientStartMonth + 1, añoInicio: clientStartYear, mesFin: currentMonth, añoActual: currentYear, mesAdeudado: currentMonth };
      } else {
        return { status: 2, mesInicio: clientStartMonth + 1, añoInicio: clientStartYear, mesFin: currentMonth, añoActual: currentYear }
      }
    }

    const lastPaymentDate = cuotas.length > 0 ? new Date(cuotas[cuotas.length - 1].date) : clientCreatedAt;
    const lastPaymentMonth = lastPaymentDate.getMonth();
    const lastPaymentYear = lastPaymentDate.getFullYear();
    const today = new Date();
    const daysLate = Math.floor((today - lastPaymentDate) / (1000 * 60 * 60 * 24));

    if (lastPaymentYear === currentYear && lastPaymentMonth === currentMonth) {
      return { status: 1, mesInicio: clientStartMonth + 1, añoInicio: clientStartYear, mesFin: currentMonth, añoActual: currentYear };
    } else {
      const nextMonth = lastPaymentMonth + 1;
      const nextYear = lastPaymentYear + (nextMonth === 12 ? 1 : 0);

      if (daysLate >= 30 && daysLate <= 59) {
        return { status: 4, mesInicio: nextMonth, añoInicio: nextYear, mesAdeudado: nextMonth, añoActual: currentYear, mesFin: currentMonth };
      } else if (daysLate >= 60) {
        return { status: 2, mesInicio: nextMonth, añoInicio: nextYear, mesAdeudado: nextMonth, añoActual: currentYear, mesFin: currentMonth };
      } else {
        return { status: 2, mesInicio: nextMonth, añoInicio: nextYear, mesAdeudado: nextMonth, añoActual: currentYear, mesFin: currentMonth };
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const selectedMonth of selectedMonths) {
        const paymentData = {
          membershipNum: id, 
          amountPay: duesPay.amount,
          month: selectedMonth.month + 1,
          idDues: duesPay.id,
          year: selectedMonth.year,
          departments: client.location
        };
        const response = await axios.post('/api/payments/payments', paymentData);
        console.log(`Pago almacenado para ${getMonthName(selectedMonth.month)} de ${selectedMonth.year}`);
      }

      // Restablece el estado después de completar el proceso
      setSelectedMonths([]);
    } catch (error) {
      console.error('Error al almacenar pagos:', error);
    }
  };
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  };
  const handleMonthChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setSelectedMonths((prevMonths) => [...prevMonths, { month: selectedDate.getMonth(), year: selectedDate.getFullYear() }]);
  };
  const totalCuota = selectedMonths.reduce((total, selectedMonth) => {
    const cuota = duesPay.amount || 0; // Valor por defecto si duesPay.amount es nulo
    return total + cuota;
  }, 0);
  console.log(selectedMonths)

  return (
    <div>
      {data.loading && <p>Cargando...</p>}
      {data.status && (
        <AlertCheck
          status={data.status}
          text={data.status === 1 ? 'El pago se encuentra al día' : data.status === 4 ? 'Se encuentra una cuota impaga: ' : 'El cliente se encuentra suspendido por mora'}
          textInfo={
            data.status === 1 ? 'El cliente se encuentra al día con sus cuotas' :
              data.status === 4 ? `El cliente presenta impaga la cuota del mes de ${getMonthName(data.mesAdeudado)}` :
                `El cliente presenta impagas las cuotas desde ${getMonthName(data.mesInicio)} de ${data.añoInicio} hasta ${getMonthName(data.mesFin)} de ${data.añoActual}`
          }
        />
      )}
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Seleccione el periodo de pago de:</h2>
            <input
              type="month"
              name="startDate"
              value={fechas[0] ? fechas[0].toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit' }) : ""}
              onChange={handleMonthChange}
            />
            <h2>hasta: </h2>
            <input
              type="month"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
            <div>
              <h2>Cantidad de meses a pagar: {selectedMonths.length}</h2>
              <h2>Total en pesos: ${totalCuota}</h2>
              <h2>Valor de la cuota actual: ${duesPay.amount}</h2>
              <Button name={'Pagar'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DuesPay;
