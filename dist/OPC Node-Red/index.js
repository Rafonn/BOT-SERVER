"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const opcua = require("node-opcua");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});
class Conectar {
    connectToOpcuaServer(endpointUrl, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = opcua.OPCUAClient.create({
                endpointMustExist: false,
                connectionStrategy: {
                    maxRetry: 1,
                },
                connectTimeout: timeout,
            });
            let isConnected = false;
            try {
                yield client.connect(endpointUrl);
                const session = yield client.createSession();
                isConnected = true;
                yield session.close();
            }
            catch (err) {
                console.error("Erro ao conectar ao servidor OPC UA:", err);
                isConnected = false;
            }
            finally {
                yield client.disconnect();
            }
            return isConnected;
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const endpointUrl = process.env.ENDPOINT || ''; // "opc.tcp://endpoint:port"
                const timeout = 5000;
                const res = yield this.connectToOpcuaServer(endpointUrl, timeout);
                return res;
            }
            catch (err) {
                console.error('Erro ao inicializar a conexão OPC UA:', err);
                return false;
            }
        });
    }
}
exports.default = Conectar;
