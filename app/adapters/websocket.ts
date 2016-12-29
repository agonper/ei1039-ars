import {appConfig} from "../config/environment";
import {applicationStore} from "../store";

class WebSocketClient {
    private _connection: WebSocket;
    private _isConnected: boolean;

    public get connection() {
        return this._connection;
    }

    public get isConnected() {
        return this._isConnected;
    }

    public start(): Promise<any> {
        if (this._isConnected) return Promise.resolve(this._connection);

        const {loggedIn, token} = applicationStore.getState().login;
        if (!loggedIn) return Promise.reject(new Error("Cannot connect, not logged in"));

        this._connection = new WebSocket(`${appConfig.wsUrl}/api/ws?token=${token}`);

        return new Promise((resolve, reject) => {
            this._connection.onopen = () => {
                this._isConnected = true;
                return resolve(this._connection);
            };

            this._connection.onerror = (err: ErrorEvent) => {
                console.log(err);
                this._isConnected = false;
                return reject(err);
            };

            this._connection.onclose = () => {
               this._isConnected = false;
            };
        });
    }

    public stop() {
        if (this._isConnected) {
            this._connection.close();
        }
    }
}

export const webSocketClient = new WebSocketClient();
