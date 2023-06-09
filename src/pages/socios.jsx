import React, { useState, useEffect } from 'react'
import { clientGetData } from '../clientServices/userService'
import Head from 'next/head'
import Layout from '@/components/hooks/layout';
import axios from 'axios';
import Table from '@/components/table';

/* const clientService = clientServiceFactory(); */

const socios = () => {
  const [client, setData] = useState([]);
  const headers = ['Nro Socio', 'Nombre', 'Apellido', 'Direccion'];
  const data = [
    ['hola', 'Nombre', 'Apellido', 'Direccion'],
    ['hola', 'Nombre', 'Apellido', 'Direccion']
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/client');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  return (
    <>
      <Head>
        <title>Mevep</title>
      </Head>
      <main>
        <Layout className='pt-16'>
          <div>
            <Table headers={headers} data={data} bgColor="purple-500" textColor="black" />
          </div>
        </Layout>
      </main>
    </>
  )
}

export default socios;