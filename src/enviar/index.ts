import nodemailer, { Transporter } from 'nodemailer';
import * as path from 'path';
import dotenv from 'dotenv';
import Conectar from '../OPC Node-Red/index';

// Defining the dotenv path.
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

// Email / Transport configuration.
const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async () => {

    // Email options.
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `STATUS OPCUA / NODE-RED -- ATENÇÃO!`,
        text: `SERVIDOR OPCUA ESTÁ FORA DO AR!
               VERIFICAR A CONDIÇÃO DO NODE-RED.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso:', info.response);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};

let envio: boolean = false;
const conector = new Conectar();

setInterval(async () => {

    const res: boolean = await conector.init();

    if (!res && !envio) {
        await sendEmail();
        envio = true;
    } else if(res)
        envio = false;

}, 60000);
