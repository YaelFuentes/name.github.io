import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@/components/Mui/Button';
import moment from 'moment';

const QuotesClient = ({ id }) => {
  const [client, setClient] = useState({});
  const [pendingDues, setPendingDues] = useState([]);
  const [amountPay, setAmountPay] = useState([]);
  const [formData, setFormData] = useState({
    membershipNum: '',
    idDues: '',
    date: moment().format('YYYY-MM-DD'),
    amountPay: '',
    departments: '',
    created_at: moment().format('YYYY-MM-DD'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/clients/client?id=${id}`);
        setClient(response.data);
        const duesResponse = await axios.get(`/api/payments/payments?id=${id}`);
        setPendingDues(duesResponse.data);
        const responseAmount = await axios.get(`/api/fee/fee?id=1`)
        setAmountPay(responseAmount.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // Actualiza el formData cuando amountPay se carga
    setFormData(prevFormData => ({
      ...prevFormData,
      membershipNum: client.membershipNum,
      idDues: amountPay.id,
      amountPay: amountPay.amount,
      departments: client.location,
    }));
  }, [amountPay, client]);

  const handleSubmit = (fechaCuota) => {
    const updatedFormData = {
      ...formData,
      date: moment(fechaCuota).format('YYYY-MM-DD'),
    };
    setFormData(updatedFormData);
  };
  useEffect(() => {
    sendPay(formData);
  }, [formData]);

  const sendPay = async () => {
    try {
      /* const response = await axios.post(`/api/payments/payments`, formData) */
      console.log('envio al back: ', formData)
    } catch (e) {
      console.error('Error al realizar un pago: ', e)
    }
  }

  const cuotasPendientes = [];
  if (pendingDues.length > 0) {
    const months = pendingDues[0].meses;
    let fechaInicio;
    if (pendingDues[0].fechaUltimoPago) {
      fechaInicio = new Date(pendingDues[0].fechaUltimoPago.date);
    } else {
      fechaInicio = new Date(pendingDues[0].fechaCreacion);
    }
  
    for (let i = 1; i <= months; i++) {
      const fechaCuota = new Date(fechaInicio);
      fechaCuota.setMonth(fechaCuota.getMonth() + i);
  
      cuotasPendientes.push(
        <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4" key={i}>
          <div className="border rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Cuota {i}</div>
              <div>Monto a pagar: {pendingDues[0].amountPay}</div>
              <p className="text-gray-700 text-base">Fecha de pago: {fechaCuota.toLocaleDateString()}</p>
              <Button
                name={'Pagar'}
                onClick={() => handleSubmit(fechaCuota)}
              />
            </div>
          </div>
        </div>
      );
    }
  }
  
  

  /* console.log(pendingDues);
  console.log(client);
  console.log(amountPay); */

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        <strong>{pendingDues.length}</strong> cuota/s pendientes del cliente {client.lastname} {client.name}
      </h1>
      <div className='grid grid-cols-6 gap-4'>
        {cuotasPendientes}
      </div>
    </div>
  );
};

export default QuotesClient;
