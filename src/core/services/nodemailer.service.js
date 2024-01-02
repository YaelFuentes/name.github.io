const nodemailer = require('nodemailer')
import { db } from '@/core/connection/databaseService'

class EventsService {
  constructor(user, password, id, startDate, endDate) {
    this.user = user;
    this.password = password;
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  async getAll(isSend) {
    try {
      if (isSend === 0) {
        const table = 'events'
        const records = await db(`${table}`)
        return records
      }else {
        const table = 'events'
        const records = await db(table).where('isSend', '=', 0);
        return records
      }
    } catch (e) {
      console.error("Error fetching records by ID:", e)
      return null
    }
  }

  async notificationMail(mailOptions) {
    try {
      function formatearFechaHora(fechaString) {
        const fecha = new Date(fechaString);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();
        const hora = fecha.getHours();
        const minuto = fecha.getMinutes();

        const diaFormateado = dia < 10 ? `0${dia}` : dia;
        const mesFormateado = mes < 10 ? `0${mes}` : mes;
        const horaFormateada = hora < 10 ? `0${hora}` : hora;
        const minutoFormateado = minuto < 10 ? `0${minuto}` : minuto;

        const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año} ${horaFormateada}:${minutoFormateado}`;
        return fechaFormateada;
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
          user: process.env.MAIL_FROM,
          pass: process.env.APP_PASS
        }
      });
      const from = process.env.MAIL_FROM;
      const mailDataInfo = {
        from: from,
        to: mailOptions.user,
        subject: `Notificacion Mevep`,
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h2>Tiene un recordatorio pendiente, a finalizar ${formatearFechaHora(mailOptions.endDate)} Hrs</h2>
        <p><strong>Recordatorio: ${mailOptions.content}</strong> </p>
      </body>
      </html>`,
        replyTo: 'noreply@miempresa.com'
      };
      /* const info = await transporter.sendMail(mailDataInfo) */
      console.log('mnailoptions', mailOptions.user)
      if (info.messageId) {
        console.log('Correo enviado correctamente');
        await db('events')
          .where('id', '=', mailOptions.id) // Ajusta la condición según tu esquema
          .update({ isSend: 1 });

        console.log('Estado de isSend actualizado en la base de datos');
      } else {
        console.error('Error al enviar el correo');
      }
    } catch (e) {
      console.log('error')
    }
  }
}
export default EventsService;