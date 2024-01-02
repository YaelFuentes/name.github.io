import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/hooks/layout';
import axios from 'axios';
import TableResponsive from '@/components/table';
import SimpleModal from '@/components/Mui/modal';
import SearchComponent from '@/components/searchInput';
import SelectMui from '@/components/Mui/select';

const socios = () => {
  const [client, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [filteredClient, setFilteredClient] = useState(client);
  const [lastMembershipNum, setLastMembershipNum] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(1);

  const headers = [
    { id: 'membershipNum', label: 'Numero Socio', minWidth: 170 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'lastname', label: 'Apellido', minWidth: 100 },
    { id: 'phone', label: 'Telefono', minWidth: 100 },
    { id: 'address', label: 'Direccion', minWidth: 100 },
    { id: 'namePatient', label: 'Mascota', minWidth: 100 },
    { id: 'race', label: 'Raza', minWidth: 100 },
    /* { id: 'list', label: 'Lista espera', minWidth: 100 },
    { id: 'edit', label: 'Editar', minWidth: 100 } */
  ];

  useEffect(() => {
    setFilteredClient(client);
  }, [client]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/clients/client');
        const responseClient = await axios.get('/api/patients/patient');

        const data = response.data;
        const combinedData = {};

        for (const client of responseClient.data) {
          combinedData[client.membershipNum] = { ...client };
        }

        const combinedArray = data.map((item) => {
          const clientData = combinedData[item.membershipNum];
          if (clientData) {
            return { ...item, ...clientData };
          }
          return item;
        });

        setData(combinedArray);

        if (combinedArray.length > 0) {
          const lastElement = combinedArray[combinedArray.length - 1];
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
      const dataToSendClient = {
        membershipNum: formData.membershipNum,
        name: formData.name,
        lastname: formData.lastname,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        location: formData.location,
        PayMethod: selectedMethod,
      }
      const dataToSendPatient = {
        membershipNum: formData.membershipNum,
        namePatient: formData.namePatient,
        race: formData.race,
        subRace: formData.subRace,
        size: formData.size,
        color: formData.color,
        gender: formData.gender
      }
      const response = await axios.post('/api/clients/client', dataToSendClient)
      const responsePatient = await axios.post('/api/patients/patient', dataToSendPatient)
      if (response.status === 200 && responsePatient.status === 200) {
        console.log('Usuario guardado con exito')
      } else {
        console.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleSearch = (searchTerm) => {
    const searchTermsArray = searchTerm.toLowerCase().split(' ');

    if (searchTermsArray.length === 0) {
      setFilteredClient(client);
      return;
    }

    const filtered = client.filter((item) =>
      searchTermsArray.every(term =>
        Object.values(item).some((value) =>
          value !== null && value.toString().toLowerCase().includes(term)
        )
      )
    );

    setFilteredClient(filtered);
  };
  const handleSelectChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Mevep</title>
      </Head>
      <main>
        <Layout classNameName='pt-16'>
          <div>
            <div className='grid grid-cols-3 gap-3'>
              <div className='p-5 m-2'>
                <SearchComponent onSearch={handleSearch} />
              </div>
              <div className='m-2 p-4'>
                <SimpleModal
                  nameButton='Agregar socio'
                  text='Agregar socio nuevo'
                  optional={
                    <>
                      <form onSubmit={handleSubmit} className='w-full '>
                        <div>
                          <div className='grid grid-cols-3 gap-4'>
                            <div className="relative z-0 w-full mb-6 group">
                              <input type="text" name="membershipNum" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=' '
                                required
                                onChange={handleChange} />
                              <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Numero socio {lastMembershipNum + 1}
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                              <input type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                onChange={handleChange} />
                              <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Nombre
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                              <input type="text" name="lastname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={handleChange}
                                required />
                              <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Apellido
                              </label>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 md:grid-cols-3 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                              <input type="text" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                onChange={handleChange} />
                              <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Telefono (0261-2084810)
                              </label>
                            </div>
                            <div className="col-span-2 relative z-0 w-full mb-6 group">
                              <input type="text" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                onChange={handleChange} />
                              <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 relative z-0 w-full mb-6 group ">
                              <input type="address" name="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                onChange={handleChange} />
                              <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                direccion
                              </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                              <input
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                type="address"
                                placeholder=" "
                                required
                                name="location"
                                onChange={handleChange} />
                              <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Localidad
                              </label>
                            </div>
                          </div>
                          <div className='grid grid-cols-2 gap-4'>
                            <div className="relative z-0 w-full mb-6 group">
                              <input type="text" name="dni" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                onChange={handleChange} />
                              <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DNI</label>
                            </div>
                            <div>
                              <SelectMui
                                label='Metodo de cobro'
                                name='PayMethod'
                                onChange={handleSelectChange}
                                options={[
                                  { value: '1', label: 'Local' },
                                  { value: '2', label: 'Cobrador' }
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                        <h3 className='text-center p-4'>Ingreso Mascotas</h3>
                        <div className='grid grid-cols-3 gap-4'>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              name='namePatient'
                              placeholder=" "
                              type="text"
                              required
                              onChange={handleChange} />
                            <label
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Nombre mascota
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              name='race'
                              placeholder=" "
                              type="text"
                              required
                              onChange={handleChange} />
                            <label
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Raza
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              name='subRace'
                              placeholder=" "
                              type="text"
                              onChange={handleChange} />
                            <label
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Sub Raza
                            </label>
                          </div>
                        </div>
                        <div className='grid grid-cols-3 gap-4'>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              name='size'
                              placeholder=" "
                              type="text"
                              required
                              onChange={handleChange} />
                            <label
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Tamaño
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              name='color'
                              placeholder=" "
                              type="text"
                              required
                              onChange={handleChange} />
                            <label
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Color
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              name='gender'
                              placeholder=" "
                              type="text"
                              required
                              onChange={handleChange} />
                            <label
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Genero
                            </label>
                          </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Agregar socio nuevo
                        </button>
                      </form>
                    </>
                  } />
                <div id="alert-container"></div>
              </div>
            </div>
            <div className='m-3 p-3 '>
              <TableResponsive
                columns={headers}
                rows={filteredClient}
                routes={'membership'}
                optional={
                  <>
                    <button>hola</button>
                  </>
                }
              />
            </div>
          </div>

        </Layout>
      </main>
    </>
  )
}

export default socios;