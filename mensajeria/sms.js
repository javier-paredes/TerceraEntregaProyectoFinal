const dotenv = require('dotenv');
dotenv.config();
require('../loggers/log4js')
const log4js = require("log4js");

const loggerConsola = log4js.getLogger('consola');
const loggerError = log4js.getLogger('error');

let accountSid = process.env.SMS_SID;
let authToken = process.env.SMS_TOKEN;

const client = require('twilio')(accountSid, authToken);

class SMS {
    constructor() {

    }

    enviarSMS(usuario, texto, telefono) {
        client.messages.create({
            body: `${usuario} mencionó a un administrador en el siguiente mensaje: ${texto}`,
            from: '+12673968346',
            to: `${telefono}`
        })
            .then(message => loggerConsola.info(message.sid))
            .catch(loggerError.error('No se pundo enviar el SMS'))
    }

    enviarSMSCompra(telefono) {
        client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: '+12673968346',
            to: `${telefono}`
        })
            .then(message => loggerConsola.info(message.sid))
            .catch(loggerError.error('No se pundo enviar el SMS de compra'))
    }

    enviarWhatsappAdmin(datos) {
        client.messages.create({
            body: `Datos compra cliente: ${datos}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${process.env.NUMERO_WHATSAPP}`
        })
            .then(message => loggerConsola.info(message.sid))
            .catch(loggerError.error('No se pundo enviar el mensaje por Whatsapp'))
    }
}

module.exports = new SMS();