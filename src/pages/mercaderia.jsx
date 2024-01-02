import React, { useEffect, useState } from 'react'
import TableResponsive from '@/components/table'
import axios from 'axios'
import Head from 'next/head'
import SimpleModal from '@/components/Mui/modal'
import SearchComponent from '@/components/searchInput'

const Mercaderia = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState(products);

  useEffect(() => {
    setFilteredProduct(products);
  }, [products]);

  const headers = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'description', label: 'Descripcion', minWidth: 100 },
    { id: 'price', label: 'Precio Particular', minWidth: 100 },
    { id: 'priceMembership', label: 'Precio Socio', minWidth: 100 },
    { id: 'supplier', label: 'Proveedor', minWidth: 100 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products/products');
        setProducts(response.data)
      } catch (e) {
        console.error('Error al intentar mostrar los datos: ', e)
      }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/products/products', formData)
      if (response.status === 200) {
        console.log('Producto guardado con exito')
      } else {
        console.error(response.data.error)
      }
    } catch (e) {
      console.error('Error al insertar los datos: ', e)
    }
  }
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  };

  const handleSearch = (searchTerm) => {
    const searchTermsArray = searchTerm.toLowerCase().split(' ');
    if (searchTermsArray.length === 0) {
      setFilteredProduct(products);
      return;
    }
    const filtered = products.filter((item) =>
      searchTermsArray.every(term =>
        Object.values(item).some((value) =>
          value !== null && value.toString().toLowerCase().includes(term)
        )
      )
    );
    setFilteredProduct(filtered);
  };

  return (
    <>
      <Head>
        <title>Mevep</title>
      </Head>
      <main>
        <div className='p-3 m-3'>
          <SearchComponent onSearch={handleSearch} />
        </div>
        <div className='m-3 p-3'>
          <TableResponsive columns={headers} rows={filteredProduct} routes={'products'} />
        </div>
        <div className='p-3 m-3'>
          <SimpleModal
            nameButton='Cargar Mercaderia'
            text='Agregar nueva producto'
            optional={
              <>
                <form onSubmit={handleSubmit}>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=' '
                      required
                      onChange={handleChange} />
                    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Nombre del producto
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="description" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleChange}
                      required />
                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Descripcion
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="price" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleChange}
                      required />
                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Precio Particular
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="priceMembership" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleChange}
                      required />
                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Precio Socio
                    </label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="text" name="supplier" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      onChange={handleChange}
                      required />
                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Proveedor
                    </label>
                  </div>
                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cargar
                  </button>
                </form>
              </>
            }
          />
        </div>
      </main>
    </>
  )
}

export default Mercaderia