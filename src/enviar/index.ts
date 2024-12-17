import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';
import Conectar from '../OPC Node-Red/index';

dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'botmetrisptr@gmail.com',
        pass: 'kckn phbd cjqj vumo'
    }
});

const sendEmail = async () => {

    const mailOptions = {
        from: 'botmetrisptr@gmail.com',
        to: 'rafael.carneiro@andritz.com',
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
