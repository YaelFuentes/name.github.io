import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '../../Flowbite/cards';
import moment from 'moment';
import SimpleModal from '../../Mui/modal';

const MedicalHistory = ({ id }) => {
  const [data, setData] = useState([]);
  const [editedHistory, setEditedHistory] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/shift/medical?id=${id}`);
        setData(response.data);
        setEditedHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async (ids) => {
    try {
      const arrayWithoutHistory = Object.values(editedHistory)
        .filter((item) => typeof item === 'object' && !Array.isArray(item))
        .map(({ history, ...rest }) => rest);
      const editedItem = arrayWithoutHistory.find((item) => item.id === ids);
      editedItem.history = editedHistory.history;
      await axios.put(`/api/shift/medical?id=${ids}`, editedItem);
      const updatedData = await axios.get(`/api/shift/medical?id=${id}`);
      setData(updatedData.data);
      setEditMode(false);
      console.log('Editado exitosamente.');
    } catch (error) {
      console.error('No se pudo guardar', error);
    }
  };

  const handleDelete = async (ids) => {
    try {
      const response = await axios.delete(`/api/shift/medical?id=${ids}`);
      if (response.status === 200) {
        console.log('Eliminado con éxito');
        // Actualizar el estado local (data) después de eliminar
        const updatedData = data.filter(item => item.id !== ids);
        setData(updatedData);
      } else {
        console.log('Error 400');
      }
    } catch (e) {
      console.error('Error al eliminar:', e);
    }
  };

  const handleButtonClick = () => setEditMode(true);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setEditedHistory({
      ...editedHistory,
      [name]: value,
    });
  };

  return (
    <div>
      {data.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {data.map((item) => (
            <div className='flex-shrink-0 mx-2 my-2 w-64 h-80' key={item.id}>
              <Tabs
                title={`Atendido por: ${item.doctor} , razon: ${item.reason}`}
                content={`Motivo de consulta del ${moment(item.date).format('DD/MM/YYYY')} : ${item.history}`}
                buttonName={
                  <>
                    <SimpleModal
                      nameButton='Ver Mas'
                      text={`Consulta medica paciente: ${item.patientName}`}
                      optional={
                        <>
                          {editMode ? (
                            <div className='bg-gray-100 p-4 rounded-md' key={item.id}>
                              <h2 className='text-center p-2 m-2 text-xl font-semibold'>
                                Atendido el día: {moment(item.date).format('DD/MM/YYYY')}
                              </h2>
                              <div className='mb-4'>
                                <label htmlFor='history' className='block text-lg font-bold mb-2'>
                                  Consulta:
                                </label>
                                <input
                                  type='text'
                                  name='history'
                                  placeholder='consulta...'
                                  defaultValue={item.history}
                                  onChange={handleClientChange}
                                  className='w-full p-2 mb-2 border border-gray-300 rounded'
                                />
                              </div>
                              <div className='p-2 m-2'>
                                <h1 className='font-bold'>Atendido por: {item.doctor}</h1>
                              </div>
                            </div>
                          ) : (
                            <div className='bg-gray-100 p-4 rounded-md'>
                              <h2 className='text-center p-2 m-2 text-xl font-semibold'>
                                Atendido el día: {moment(item.date).format('DD/MM/YYYY')}
                              </h2>
                              <div className='bg-white p-4 rounded-md shadow-md'>
                                <h1 className='p-2 m-2 text-2xl font-bold'>Consulta: {item.history}</h1>
                              </div>
                              <div className='p-2 m-2'>
                                <h1 className='font-bold'>Atendido por: {item.doctor}</h1>
                              </div>
                            </div>
                          )}
                          <button
                            onClick={() => (editMode ? handleSave(item.id) : setEditMode(true))}
                            className='text-white bg-primary-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                          >
                            {editMode ? 'Guardar cambios' : 'Editar información'}
                          </button>

                        </>
                      }
                    />
                    <button
                      onClick={() => handleDelete(item.id)}
                      className='text-white bg-primary-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                      {editMode ? '' : 'Eliminar'}
                    </button>
                  </>
                }
                maxContentLength={100}
                onClick={handleButtonClick}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='col-span-4 text-center'>No contiene historial médico hasta el momento</div>
      )}
    </div>
  );
};

export default MedicalHistory;
