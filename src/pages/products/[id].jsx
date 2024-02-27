import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'

const idProduct = () => {
  const router = useRouter();
  const productId = router.query.id
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceCost: 0,
    price: 0,
    priceMembership: 0,
    supplier: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/products?id=${productId}`);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          priceCost: response.data.priceCost,
          price: response.data.price,
          priceMembership: response.data.priceMembership,
          supplier: response.data.supplier,
        });
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [productId])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/products?id=${productId}`, formData);
      router.push(`/products/${productId}`);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(formData)

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2 m-2 p-4">
        <div>
          <label /* for="first_name" */ className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del producto</label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej. OtovierNF"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div>
          <label /* for="last_name" */ className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej. Solucion otodermica de 25 ml para caninos y felinos antimicotica"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label /* for="company" */ className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio Costo</label>
          <input
            type="number"
            id="priceCost"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="2000"
            required
            value={formData.priceCost}
            onChange={(e) =>
              setFormData({ ...formData, priceCost: e.target.value })
            }
          />
        </div>
        <div>
          <label /* for="phone" */ className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
          <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="5000"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div>
          <label /* for="website" */ className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio de socio</label>
          <input
            type="number"
            id="priceMembership"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="4000"
            required
            value={formData.priceMembership}
            onChange={(e) =>
              setFormData({ ...formData, priceMembership: e.target.value })
            }
          />
        </div>
        <div>
          <label /* for="supplier" */ className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distribuidor</label>
          <input
            type="text"
            id="supplier"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej. Zoetis"
            required
            value={formData.supplier}
            onChange={(e) =>
              setFormData({ ...formData, supplier: e.target.value })
            }
          />
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button type="submit" class="text-white bg-buttonColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Guardar cambios
        </button>
      </div>

    </form>

  )
}

export default idProduct;