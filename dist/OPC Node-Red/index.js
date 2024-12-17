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
Object.defineProperty(exports, "__esModule", { value: true });
const opcua = require("node-opcua");
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
                const endpointUrl = "opc.tcp://10.243.74.204:5000";
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
