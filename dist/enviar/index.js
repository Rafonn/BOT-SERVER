"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("../OPC Node-Red/index"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'botmetrisptr@gmail.com',
        pass: 'kckn phbd cjqj vumo'
    }
});
const sendEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'botmetrisptr@gmail.com',
        to: 'rafael.carneiro@andritz.com',
        subject: `STATUS OPCUA / NODE-RED -- ATENÇÃO!`,
        text: `SERVIDOR OPCUA ESTÁ FORA DO AR!
               VERIFICAR A CONDIÇÃO DO NODE-RED.`
    };
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso:', info.response);
    }
    catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
});
let envio = false;
const conector = new index_1.default();
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield conector.init();
    if (!res && !envio) {
        yield sendEmail();
        envio = true;
    }
    else if (res)
        envio = false;
}), 60000);
