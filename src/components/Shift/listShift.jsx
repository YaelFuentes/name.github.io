import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListShift = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/consulting/consulting');
        setList(response.data)
      } catch (err) {
        console.error('Error al insertar los datos: ', err)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">List de espera para el consultorio:</h2>
      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        {list.map((item) => {
          if (item.id === 1) {
            return (
              <div>
                <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  {item.membershipNum}
                </li>
              </div>
            )
          } else {
            return (
              <li className="flex items-center">
                <svg className="w-3.5 h-3.5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {item.membershipNum}
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export default ListShift;