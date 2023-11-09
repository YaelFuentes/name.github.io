import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InfoClientCard = ({ id }) => {
  const [client, setClient] = useState([]);
  const [patient, setPatient] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState({});
  const [editedPatient, setEditedPatient] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/clients/client?id=${id}`);
        const responsePatient = await axios.get(`/api/patients/patient?id=${id}`);
        setPatient(responsePatient.data)
        setClient(response.data);
        setEditedClient(response.data);
        setEditedPatient(responsePatient.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData()
  }, [id])

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    // Realiza la lógica para guardar los cambios en la base de datos o donde sea necesario.
    try {
      await axios.put(`/api/clients/client?id=${id}`, editedClient);
      await axios.put(`/api/patients/patient?id=${id}`, editedPatient);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setEditedClient({
      ...editedClient,
      [name]: value,
    });
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({
      ...editedPatient,
      [name]: value,
    });
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/queue/newQueue', client.membershipNum, patient.namePatient)
      if (response.status === 200) {
        console.log('Añadido a la cola exitosamente')
      } else {
        console.error(response.data.message)
      }
    } catch (e) {
      console.error(error)
    }
  } */

  return (
    <div>
      <div>
        {editMode ? (
          <>
            <div>
              <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4'>
                <input
                  type="text"
                  name="membershipNum"
                  value={editedClient.membershipNum}
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="name"
                  value={editedClient.name}
                  onChange={handleClientChange}
                />
                <select name="payMethod" onChange={handleClientChange}>
                  <option value="1">Local</option>
                  <option value="2">Cobrador</option>
                </select>
              </div>
              <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
                <input
                  type="text"
                  name="address"
                  value={editedClient.address}
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="email"
                  value={editedClient.email}
                  onChange={handleClientChange}
                />
                <input
                  type="text"
                  name="phone"
                  value={editedClient.phone}
                  onChange={handleClientChange}
                />
              </div>
            </div>
            <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4 mt-6'>
              <input
                type="text"
                name="namePatient"
                value={editedPatient.namePatient}
                onChange={handlePatientChange}
              />
              <input
                type="text"
                name="race"
                value={editedPatient.race}
                onChange={handlePatientChange}
              />
            </div>
            <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
              <input
                type="text"
                name="subRace"
                value={editedPatient.subRace}
                onChange={handlePatientChange}
              />
              <input
                type="text"
                name="size"
                value={editedPatient.size}
                onChange={handlePatientChange}
              />
              <input
                type="text"
                name="gender"
                value={editedPatient.gender}
                onChange={handlePatientChange}
              />
              <input
                type="text"
                name="identification"
                value={editedPatient.identification}
                onChange={handlePatientChange}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4'>
                <h3 className='font-bold text-lg text-black'>Nro de socio : <span>{client.membershipNum}</span></h3>
                <h3 className='font-bold text-lg'>{client.lastname}, {client.name}</h3>
                <h3 >Metodo de cobro : &nbsp;
                  <span className='font-bold'>
                    {client.PayMethod == 1 ? 'Local' : 'Cobrador'}
                  </span>
                </h3>
              </div>
              <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
                <h3 >Domicilio : <span className='font-bold text-sm text-black'>{client.address}, {client.location}, {client.city}</span></h3>
                <h3>email : <p className='font-bold text-sm text-black'>{client.email}</p></h3>
                <h3>Telefono : <p className='font-bold text-sm text-black'>{client.phone}</p></h3>
              </div>
            </div>
            <div>
              <div className='bg-gray-200 p-4 grid grid-cols-3 gap-4 mt-6'>
                <h3 className=''>
                  Nombre Mascota : &nbsp;
                  <span className='font-bold'>
                    {patient.namePatient}
                  </span>
                </h3>
                <h3>
                  Raza : &nbsp;
                  <span className='font-bold'>
                    {patient.race}
                  </span>
                </h3>
              </div>
              <div className='bg-blue-200 p-4 grid grid-cols-3 gap-4 md:grid-cols-2'>
                <h3>
                  Sub Raza : &nbsp; <span className='font-bold'>{patient.subRace ? patient.subRace : ' - '}</span>
                </h3>
                <h3>Tamaño : <span className='font-bold'>{patient.size}</span></h3>
                <h3>Color : <span className='font-bold'>{patient.color}</span></h3>
                <h3>Genero : <span className='font-bold'>{patient.gender}</span></h3>
                <h3>Numero de identificacion : <span className='font-bold'>{patient.identification ? patient.identification : ' - '}</span></h3>
              </div>
            </div>
          </>
        )}
        {/* Resto del contenido del componente */}
        <button onClick={editMode ? handleSave : handleEdit}>
          {editMode ? 'Guardar' : 'Editar'}
        </button>
      </div>
      {/* Resto del contenido del componente */}
    </div>
  )
}

export default InfoClientCard