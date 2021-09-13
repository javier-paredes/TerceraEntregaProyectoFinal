const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
require('../loggers/log4js')
const log4js = require("log4js");

const loggerConsola = log4js.getLogger('consola');
const loggerError = log4js.getLogger('error');

class Ethereal {
    constructor() {

    }

    enviarMailOrdenCompra(productos, nombre, email) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        });
        let mailOptions = {
            from: 'Servidor NodeJS',
            to: process.env.GMAIL_USER,
            subject: `Nuevo pedido de ${nombre} (${email})`,
            html: `Productos pedidos: ${productos}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                loggerError.error(err)
                return err
            }
            loggerConsol.info(info)
        })

    }

    mailAdminRegistro(nuevoUsuario) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        });
        let mailOptions = {
            from: 'Servidor NodeJS',
            to: process.env.GMAIL_USER,
            subject: 'Nuevo registro',
            html: `Datos nuevo usuario: ${nuevoUsuario}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                loggerError.error(err)
                return err
            }
            loggerConsola.info(info)
        })
    }

    enviarMailLogIn(email, usuario, foto) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        });

        let mailOptions = {
            from: 'Servidor NodeJS',
            to: email,
            subject: 'Se hizo login a través de Facebook',
            html: `Se detectó que el usuario ${usuario} hizo un login a través de Facebook en la fecha: ` + new Date().toLocaleString,
            attachments: [
                {
                    path: `${foto}`
                }
            ]
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                loggerError.error(err)
                return err
            }
            loggerConsola.info(info)
        })
    }
    enviarMailLogOut(email, usuario) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        });

        let mailOptions = {
            from: 'Servidor NodeJS',
            to: email,
            subject: 'Se hizo login a través de Facebook',
            html: `Se detectó que el usuario ${usuario} hizo un logout a través de Facebook en la fecha: ` + new Date().toLocaleString,
            attachments: [
                {
                    path: `${foto}`
                }
            ]
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                loggerError.error(err)
                return err
            }
            loggerConsola.info(info)            
        })
    }
}

module.exports = new Ethereal();