import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Medical = () => {
  const [shiftMedical, setShiftMedical] = useState([]);
  const [list, setList] = useState([])

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const consultingResponse = await axios.get('/api/consulting/consulting')
        const consultingData = consultingResponse.data
        const idsWithStatus2 = consultingData
          .filter(consult => consult.status === 2)
          .map(consult => consult.id);
        const shiftResponse = await axios.get(`/api/shift/medical?id=${idsWithStatus2.join(',')}`);
        console.log(shiftResponse.data)
        setShiftMedical(shiftResponse.data);
        setList(consultingData);
      } catch (err) {
        console.error('Error al obtener los datos')
      }
    }
    fetchData();
  }, []) */


  return (
    <div>
      <h2 className='text-lg text-center p-2'>Proximo paciente</h2>
      {/* {shiftMedical.map((item) => {
        return (
          <div>
            <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </a>
          </div>
        )
      })} */}
    </div>
  )
}

export default Medical;