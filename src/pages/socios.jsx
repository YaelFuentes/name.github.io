import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/hooks/layout';
import axios from 'axios';
import TableResponsive from '@/components/table';
import SimpleModal from '@/components/Mui/modal';

const socios = () => {
  const [client, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [lastMembershipNum, setLastMembershipNum] = useState('');

  const headers = [
    { id: 'membershipNum', label: 'Numero Socio', minWidth: 170 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'lastname', label: 'Apellido', minWidth: 100 },
    { id: 'phone', label: 'Telefono', minWidth: 100 },
    { id: 'address', label: 'Direccion', minWidth: 100 },
    { id: 'dni', label: 'DNI', minWidth: 100 },
    { id: 'edit', label: 'Editar', minWidth: 100 }
  ];
  const getRows = (a) => {
    a.map( i => {
      return i.name
    })
  }
  console.log(getRows(client))
  console.log(client)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/clients/client');
        const data = response.data;
        setData(data);
        if (data.length > 0) {
          const lastElement = data[data.length - 1];
          setLastMembershipNum(lastElement.membershipNum);

          setFormData({
            ...lastElement,
            membershipNum: lastElement.membershipNum
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/clients/newClient', formData)
      if (response.status === 200) {
        console.log('Usuario guardado con exito')
      } else {
        console.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <Head>
        <title>Mevep</title>
      </Head>
      <main>
        <Layout className='pt-16'>
          <div>
            <TableResponsive columns={headers} rows={client} optional={
              <>
                <SimpleModal
                  nameButton='Editar'
                  text={`Editar socio Nro `}
                  optional={
                    <>
                    </>
                  } />
              </>
            } />
          </div>
          <div>
            <SimpleModal
              nameButton='Agregar socio'
              text='Agregar socio nuevo'
              optional={
                <>
                  <form onSubmit={handleSubmit}>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="membershipNum" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=' '
                        defaultValue={lastMembershipNum}
                        required
                        onChange={handleChange} />
                      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numero socio</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                        onChange={handleChange} />
                      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text" name="lastname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={handleChange}
                        required />
                      <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Apellido</label>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={handleChange} />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefono (0261-2084810)</label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={handleChange} />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                      </div>
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 w-full mb-6 group">
                        <input type="address" /* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */ name="address" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={handleChange} />
                        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">direccion</label>
                      </div>
                      <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="dni" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          onChange={handleChange} />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DNI</label>
                      </div>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  </form>
                </>
              } />
            <div id="alert-container"></div>
          </div>
        </Layout>
      </main>
    </>
  )
}

export default socios;