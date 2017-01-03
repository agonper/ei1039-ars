import {appConfig} from "../config/environment";
import {applicationStore} from "../store";
import {
    SUBSCRIBE_TOPIC, UNSUBSCRIBE_TOPIC, PUBLISH_TOPIC, ServerMessageFormat
} from "../../common/messages/ws-messages";

class WebSocketClient {
    private _connection: WebSocket;
    private _isConnected: boolean;
    private _isConnecting: boolean;
    private _connectionPromise: Promise<any>;
    private _topicListeners: {[key: string]: ((msg: any) => any)[]};

    constructor() {
        this._topicListeners = {};
    }

    public get connection() {
        return this._connection;
    }

    public get isConnected() {
        return this._isConnected;
    }

    public start(): Promise<any> {
        if (this._isConnected) return Promise.resolve(this._connection);
        if (this._isConnecting) return this._connectionPromise;

        const {loggedIn, token} = applicationStore.getState().login;
        if (!loggedIn) return Promise.reject(new Error("Cannot connect, not logged in"));

        this._connection = new WebSocket(`${appConfig.wsUrl}/api/ws?token=${token}`);

        this._connectionPromise = new Promise((resolve, reject) => {
            this._connection.onopen = () => {
                this._isConnected = true;
                this._isConnecting = false;
                this.enableMessageHandling();
                return resolve(this._connection);
            };

            this._connection.onerror = (err: ErrorEvent) => {
                console.log(err);
                this._isConnected = false;
                this._isConnecting = false;
                return reject(err);
            };

            this._connection.onclose = () => {
               this._isConnected = false;
            };
        });

        this._isConnecting = true;
        return this._connectionPromise;
    }

    public stop() {
        if (this._isConnected) {
            this._connection.close();
        }
    }

    public send(data: any) {
        this._connection.send(JSON.stringify(data));
    }

    public subscribe(topic: string, cb: (msg: any) => any) {
        this.send({cmd: SUBSCRIBE_TOPIC, args: {topic}});
        this.addTopicListener(topic, cb);
    }

    public unsubscribe(topic: string) {
        this.send({cmd: UNSUBSCRIBE_TOPIC, args: {topic}});
        delete this._topicListeners[topic];
    }

    public publish(topic: string, msg: any) {
        this.send({cmd: PUBLISH_TOPIC, args: {topic, msg}});
    }

    private addTopicListener(topic: string, cb: (msg: any) => any) {
        const topicListeners = this._topicListeners;
        if (!topicListeners[topic]) {
            topicListeners[topic] = [cb];
            return;
        }
        topicListeners[topic].push(cb);
    }

    private enableMessageHandling() {
        this._connection.onmessage = (msg: any) => {
            const topicListeners = this._topicListeners;
            const parsedMessage: ServerMessageFormat = JSON.parse(msg.data);
            const {topic, data} = parsedMessage;

            if (topicListeners[topic]) {
                topicListeners[topic].forEach((cb) => cb(data))
            }
        }
    }
}

export const webSocketClient = new WebSocketClient();
