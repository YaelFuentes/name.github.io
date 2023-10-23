import React, { useEffect, useState } from 'react'
import Layout from '@/components/hooks/layout'
import Button from '@/components/Mui/Button'
import Head from 'next/head'
import SimpleModal from '@/components/Mui/modal'
import axios from 'axios'
import TableResponsive from '@/components/table'

const HomePage = ({ user }) => {

  const [queue, setQueue] = useState([]);

  const headers = [
    { id: 'date', label: 'Dia', minWidth: 170 },
    { id: 'membershipNum', label: 'Numero de socio', minWidth: 100 },
    { id: 'patientName', label: 'Nombre del paciente', minWidth: 100 },
    { id: 'queuecol', label: 'Nro', minWidth: 100 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/queue/queue');
        setQueue(response.data)
      } catch (e) {
        console.error('Error al obtener los datos: ', e)
      }
    }
    fetchData();
  }, [])

  const formattedData = queue
    .filter((item) => item.attention === 0) // Filtrar elementos con attention igual a 0
    .map((item) => ({
      id: item.id,
      patientName: item.patientName,
      queuecol: item.queuecol,
      membershipNum: item.membershipNum,
      date: item.date
    }));
    const formattedData1 = queue
    .filter((item) => item.attention === 1) // Filtrar elementos con attention igual a 0
    .map((item) => ({
      id: item.id,
      patientName: item.patientName,
      queuecol: item.queuecol,
      membershipNum: item.membershipNum,
      date: item.date
    }));

  return (
    <div>
      <div>
        <Head>
          <title>Mevep</title>
        </Head>
        <Layout className='pt-0'>
          <div className='text-xl p-5 ml-5 font-bold'>Hola, {user.username}</div>
        </Layout>
      </div>
      <div className='relative h-32 w-32'>
        <SimpleModal
          nameButton='Lista de espera'
          text='Lista de espera'
          optional={
            <>
              <div>

                <h1 className='text-center font-bold m-5 p-2 text-xl'>Por atender</h1>
                <TableResponsive columns={headers} rows={formattedData} />

                <h1 className='text-center font-bold m-5 p-2 text-xl'>Atendidos</h1>
                <TableResponsive columns={headers} rows={formattedData1} />
            </div>
        </>
          }
        />
      </div>
    </div>
  )
}
export default HomePage;