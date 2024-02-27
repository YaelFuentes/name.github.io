import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import moment from 'moment'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useRouter } from 'next/router';

moment.locale('es');
const localizer = momentLocalizer(moment);

const Reminder = () => {
  const router = useRouter();
  const { mail } = router.query;
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: '', start, end });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, title: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/events/events')
        if (response.data !== null) {
          const filterDataEvents = response.data.filter(event => event.eventscol === 1)
          const formattedEvents = filterDataEvents.map(event => ({
            title: event.content,
            start: moment(event.startDate).toDate(),
            end: moment(event.endDate).toDate(),
          }));
          setEvents(formattedEvents);
        } else {
          console.error('El servidor devolvió una respuesta nula.');
        }
      } catch (e) {
        console.error('Error al mostrar los datos: ', e)
      }
    }
    fetchData()
  }, [])

  const loadEvents = async () => {
    try {
      const response = await axios.get('/api/events/events');
      if (response.data !== null) {
        const filterDataEvents = response.data.map(event => event.eventscol === 1)
        const formattedEvents = filterDataEvents.map((event) => ({
          title: event.content,
          start: moment(event.startDate).toDate(),
          end: moment(event.endDate).toDate(),
        }));
        setEvents(formattedEvents);
      } else {
        console.error('El servidor devolvió una respuesta nula.');
      }
    } catch (e) {
      console.error('Error al mostrar los datos: ', e);
    }
  };

  const handleAddEvent = async (e) => {
    try {
      if (newEvent.title.trim() !== '') {
        const formattedEvent = {
          content: newEvent.title,
          startDate: moment(newEvent.start).format('YYYY-MM-DD HH:mm:ss'),
          endDate: moment(newEvent.end).format('YYYY-MM-DD HH:mm:ss'),
          user: mail,
          eventscol: 1
        };

        const response = await axios.post('/api/events/events', formattedEvent);

        if (response.data !== null) {
          setEvents([...events, formattedEvent]);
          setModalOpen(false);
          loadEvents();
        } else {
          console.error('El servidor devolvió una respuesta nula.');
        }

      } else {
        alert('Por favor, ingresa un título para el recordatorio.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <>
      <div>
        <h1 className='font-bold m-2 text-xl text-center'>Calendario de recordatorios</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 400 }}
          formats={{
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }, culture, local) =>
              `${moment(start).format('HH:mm', culture)} - ${moment(end).format('HH:mm', culture)}`,
            dayRangeHeaderFormat: ({ start, end }, culture, local) =>
              `${moment(start).format('LL', culture)} - ${moment(end).format('LL', culture)}`,
          }}
        />
        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="div">
              Agregar Recordatorio
            </Typography>
            <TextField
              label="Texto del Recordatorio"
              value={newEvent.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleAddEvent} variant="contained" sx={{ mt: 2 }}>
              Agregar
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default Reminder;