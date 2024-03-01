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
import Swal from 'sweetalert2'

moment.locale('es');
const localizer = momentLocalizer(moment);

const Groomer = () => {
  const router = useRouter();
  const { mail } = router.query;
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectSlot = ({ start, end }) => {
    const startHour = moment(start).hour();
    const endHour = moment(end).hour();
    if (startHour < 9 || endHour > 14) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Solo se pueden colocar eventos entre las 9:00 y las 14:00.',
        showConfirmButton: true,
        timer: '3000'
      })
      return;
    }
    const adjustedEnd = moment(start).add(1, 'hour');
    setNewEvent({ title: '', start, end: adjustedEnd });
    setModalOpen(true);
  }

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
          const filterDataEvents = response.data.filter(event => event.eventscol === 2)
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
        const formattedEvents = response.data.map((event) => (
          {
            title: event.content,
            start: moment(event.startDate).toDate(),
            end: moment(event.endDate).toDate(),
            eventscol: events.eventscol
          }
        ));
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
        const adjustedEnd = moment(newEvent.start).add(1, 'hour');
        const formattedEvent = {
          content: newEvent.title,
          startDate: moment(newEvent.start).format('YYYY-MM-DD HH:mm:ss'),
          endDate: adjustedEnd.format('YYYY-MM-DD HH:mm:ss'),
          user: mail,
          eventscol: 2
        };

        const response = await axios.post('/api/events/events', formattedEvent);

        if (response.data !== null) {
          setEvents([...events, formattedEvent]);
          setModalOpen(false);
          loadEvents();
          Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Evento agregado con exito.',
            showConfirmButton: false,
            timer: '2500'
          })
        } else {
          console.error('El servidor devolvió una respuesta nula.');
        }
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Por favor, ingresa un título para el recordatorio.',
          showConfirmButton: true,
          timer: '3000'
        })
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  const isHourDisabled = (hour) => {
    return hour < 9 || hour >= 14;
  };

  return (
    <>
      <div>
        <h1 className='font-bold m-2 text-xl text-center'>Turnos de peluquería</h1>
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
          onSelecting={({ start, end }) => {
            const startHour = moment(start).hour();
            const endHour = moment(end).hour();
            return !isHourDisabled(startHour) && !isHourDisabled(endHour);
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

export default Groomer;