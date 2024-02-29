import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '../../Mui/Button';
import SimpleModal from '../../Mui/modal';
import NewHistorys from '../newHistorys';
import RenderClientForm from '../infoClient/renderClientForm';
import RenderClientInfo from '../infoClient/renderClientInfo';

const InfoClientCard = ({ id }) => {
  const [client, setClient] = useState([]);
  const [patient, setPatient] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState({});
  const [editedPatient, setEditedPatient] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientResponse, patientResponse] = await Promise.all([
          axios.get(`/api/clients/client?id=${id}`),
          axios.get(`/api/patients/patient?id=${id}`),
        ]);

        setClient(clientResponse.data);
        setPatient(patientResponse.data);
        setEditedClient(clientResponse.data);
        setEditedPatient(patientResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const [clientResponse, patientResponse] = await Promise.all([
        axios.put(`/api/clients/client?id=${id}`, editedClient),
        axios.put(`/api/patients/patient?id=${id}`, editedPatient),
      ]);

      if (clientResponse.status === 200 && patientResponse.status === 200) {
        console.log('Editado exitosamente.');
      }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      membershipNum: client.membershipNum,
      patientName: patient.namePatient,
      date: moment().format('YYYY-MM-DD'),
      attention: 0,
    };

    try {
      const response = await axios.post('/api/queue/queue', requestData);
      if (response.status === 200) {
        console.log('Añadido a la cola exitosamente');
      } else {
        console.error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='w-full p-4'>
      {editMode ?
        <RenderClientInfo
          editedClient={editedClient}
          handleClientChange={handleClientChange}
          editedPatient={editedPatient}
          handlePatientChange={handlePatientChange}
        />
        :
        <RenderClientForm
          client={client ? client : ''}
          patient={patient ? patient : ''}
        />
      }
      <div className='p-2 m-2'>
        <div className='mr-2'>
          <Button onClick={editMode ? handleSave : handleEdit} name={editMode ? 'Guardar' : 'Editar'} />
        </div>
        <div>
          <Button onClick={handleSubmit} name={'Añadir a la lista de espera'} />
        </div>
        <div>
          <SimpleModal
            nameButton={'Cargar historial medico'}
            text={`Añadir historial al paciente ${patient?.namePatient || ''}`}
            optional={<NewHistorys namePatient={patient?.namePatient || ''} membershipNum={id} />}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoClientCard;
