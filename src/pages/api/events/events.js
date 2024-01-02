import { EventsController } from '@/core/controller'
import schedule from 'node-schedule';

const getEventListeners = async () => {
  try {
    const recordatorios = await EventsController.getAll(1);
    const ahora = new Date().getTime();
    const eventosProximos = recordatorios.filter(recordatorio => {
      const fechaEvento = new Date(recordatorio.endDate).getTime();
      const diferenciaMilisegundos = fechaEvento - ahora;
      const diferenciaHoras = diferenciaMilisegundos / (1000 * 60 * 60);
      return diferenciaHoras > 0 && diferenciaHoras <= 24;
    });
    console.log('eventosProximos', eventosProximos)
    return eventosProximos;
  } catch (e) {
    console.log('Error al obtener eventos próximos:', error);
    throw error;
  }
}

const sendMail = async () => {
  try {
    const eventosProximos = await getEventListeners();
    if (eventosProximos && eventosProximos.length > 0) {
      for (const mailOptions of eventosProximos) {
        const sendEmailInfo = await EventsController.sendReminder(mailOptions);
      }
    } else {
      console.log('No hay eventos próximos');
    }
  } catch (e) {
    console.error('Error al enviar los datos.', e)
  }
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {

      } else {
        const record = await EventsController.getAll()
        res.json(record)
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body
      const records = await EventsController.sendReminder(fieldsUpdate)
      res.status(201).json(records)
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

schedule.scheduleJob('* * * * *', async function () {
  try {
    /* await sendMail() */
    console.log('Notificaciones enviadas exitosamente.');
  } catch (e) {
    console.error('Error al enviar las notificaciones: ', e)
  }
})