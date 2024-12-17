const opcua = require("node-opcua");

export default class Conectar {

    async connectToOpcuaServer(endpointUrl: string, timeout: number) {

        const client = opcua.OPCUAClient.create({
            endpointMustExist: false,
            connectionStrategy: {
                maxRetry: 1,
            },
            connectTimeout: timeout,
        });

        let isConnected: boolean = false;

        try {
            await client.connect(endpointUrl);

            const session = await client.createSession();

            isConnected = true;

            await session.close();

        } catch (err) {
            console.error("Erro ao conectar ao servidor OPC UA:", err);
            isConnected = false;
        } finally {
            await client.disconnect();
        }
        return isConnected;
    }

    async init(): Promise<boolean> {
        try {
            const endpointUrl: string = "opc.tcp://10.243.74.204:5000";
            const timeout: number = 5000;
            const res: boolean = await this.connectToOpcuaServer(endpointUrl, timeout);
            return res;
        } catch (err) {
            console.error('Erro ao inicializar a conexão OPC UA:', err);
            return false;
        }
    }
}