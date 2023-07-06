import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/hooks/layout';
import axios from 'axios';
import TableResponsive from '@/components/table';
import SimpleModal from '@/components/modal';
import BasicTextFields from '@/components/textfield';

const socios = () => {
  const [client, setData] = useState([]);
  const [formData, setFormData] = useState({});

  const headers = [
    { id: 'membershipNum', label: 'Numero Socio', minWidth: 170 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'lastname', label: 'Apellido', minWidth: 100 },
    { id: 'phone', label: 'Telefono', minWidth: 100 },
    { id: 'address', label: 'Direccion', minWidth: 100 },
    { id: 'address', label: 'Direccion', minWidth: 100 }
  ];

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
  }, []);

  const handleChange = ({target}) => {
    setFormData({...formData, [target.name]: target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/newClient', formData)
      /* console.log(response) */
    } catch (error) {
      console.error(error)
    }
  };
  /* console.log(client) */

  return (
    <>
      <Head>
        <title>Mevep</title>
      </Head>
      <main>
        <Layout className='pt-16'>
          <div>
            <TableResponsive columns={headers} rows={client} />
          </div>
          <div>
            <SimpleModal
              nameButton='Agregar socio'
              text='Agregar socio nuevo'
              optional={
                <>
                  <div className='text-center p-3'>
                    <form onSubmit={handleSubmit}>
                      <label htmlFor='membershipNum'>NroSocio: </label>
                      <input type='number' name='membershipNum' onChange={handleChange}></input>
                      <label htmlFor='name'>Name: </label>
                      <input type='text' name='name' onChange={handleChange}></input>
                      <label htmlFor='lastname'>Apellido: </label>
                      <input type='text' name='lastname' onChange={handleChange}></input>
                      <label htmlFor='phone'>Telefono: </label>
                      <input type='text' name='phone' onChange={handleChange}></input>
                      <label htmlFor='address'>Direccion: </label>
                      <input type='text' name='address' onChange={handleChange}></input>
                      <button>Guardar</button>
                    </form>
                  </div>
                </>
              } />
          </div>
        </Layout>
      </main>
    </>
  )
}

export default socios;