import React, { useState } from 'react';
import axios from 'axios';

export default function TableResponsive({ columns, rows, optional }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});
  const usersPerPage = 15;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = rows.slice(indexOfFirstUser, indexOfLastUser);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (indexOfLastUser < rows.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/clients/editClient', formData)
      if (response.status === 200) {
        console.log('Usuario editado con exito')
      } else {
        console.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((i) => {
                return (
                  <>
                    <th scope="col" class="px-6 py-3" key={i.id}>
                      {i.label}
                    </th>
                  </>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((i) => {
              return (
                <tr id={i.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {columns.map((column) => (
                    <td class="px-6 py-4">
                      {i[column.id]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Mostrando
            <span class="font-semibold text-gray-900 dark:text-white">
              {indexOfFirstUser + 1} - {indexOfLastUser > rows.length ? rows.length : indexOfLastUser}
            </span> clientes de <span class="font-semibold text-gray-900 dark:text-white">
              {rows.length}
            </span>
          </span>
          <ul class="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                onClick={handlePreviousPage}
                href="#"
                class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
              </a>
            </li>
            <li>
              <a
                onClick={handleNextPage}
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}