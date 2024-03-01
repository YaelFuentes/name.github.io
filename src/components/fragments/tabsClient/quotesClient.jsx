import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@/components/Mui/Button';
import moment from 'moment';
import SelectMui from '@/components/Mui/select';

const QuotesClient = ({ id }) => {
  const [data, setData] = useState({
    client: {},
    dues: {},
    amount: {}
  })
  const [selectedMonth, setSelectedMonth] = useState('');
  const [lastPaymentDate, setLastPaymentDate] = useState('');
  const [totalCuotasAPagar, setTotalCuotasAPagar] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataClient = await axios.get(`/api/clients/client?id=${id}`);
        const dataDues = await axios.get(`/api/payments/payments?id=${id}`);
        const dataAmount = await axios.get(`/api/fee/fee?id=1`);
        if (dataClient.status === 200 && dataDues.status === 200 && dataAmount.status === 200) {
          setData({
            client: dataClient.data,
            dues: dataDues.data,
            amount: dataAmount.data
          });
          if (dataDues.data[0]?.fechaUltimoPago?.date) {
            setLastPaymentDate(dataDues.data[0].fechaUltimoPago.date);
          }
          const months = [];
          
          const meses = data.dues[0] ? data.dues[0].meses : 0
          console.log(meses)
          let firstAvailableMonth = moment().add(1, 'month');// Comenzamos desde el próximo mes
          if (lastPaymentDate) {
            firstAvailableMonth = moment(lastPaymentDate).add(1, 'month');
          }
          console.log(lastPaymentDate)
          for(let i = 0; i <= meses; i++) {
            let currentMonth = moment(firstAvailableMonth).add(i, 'month');
            months.push({
              label: currentMonth.format('MMMM YYYY'),
              value: currentMonth.format('MMMM YYYY'),
            });
          }
          console.log(months)
          setSelectedMonth(months.length > 0 ? months[0].value : '');
          calculateTotalCuotasAPagar(months.value || '');
        }
      } catch (e) {
        console.error('Error al traer los datos: ', e);
      }
    };
    fetchData();
  }, []);

  const calculateTotalCuotasAPagar = (selectedMonth) => {
    if (lastPaymentDate && selectedMonth) {
      const startDate = moment(lastPaymentDate).startOf('month');
      const endDate = moment(selectedMonth).startOf('month');
      const totalMonths = endDate.diff(startDate, 'months') + 1;
      setTotalCuotasAPagar(totalMonths);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/payments/payments`)
    } catch (e) {
      console.error('Error al cargar los pagos: ', e)
    }
  }

  const dates = () => {
    if (data.dues.length > 0) {
      if (data.dues[0].fechaUltimoPago !== null) {
        return data.dues[0] ? moment(data.dues[0].fechaUltimoPago.date).format('DD-MM-YYYY') : 0
      } else {
        return data.dues[0] ? moment(data.dues[0].fechaCreacion).format('DD-MM-YYYY') : 0
      }
    } else {
      return 'No hay datos que mostrar'
    }
  }

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    calculateTotalCuotasAPagar(value);
  };

  console.log(data);
  console.log(selectedMonth);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        <strong>{data.dues[0] ? data.dues[0].meses : '0'}</strong> cuota/s pendientes del cliente {data.client.lastname} {data.client.name}
      </h1>
      <div className='grid grid-cols-6 gap-4'>
        <div>
          Pagar desde : {dates()}
        </div>
        <div>
          <SelectMui
            label="Seleccionar mes de pago"
            options={selectedMonth ? [{ label: selectedMonth, value: selectedMonth }] : []}
            value={selectedMonth}
            onChange={handleMonthChange}
          />
        </div>
        <div className="m-5">
          <Button
            name={`Pagar (${totalCuotasAPagar} cuotas)`}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default QuotesClient;
