import * as WebSocket from "ws";
import {User} from "../models/user";
import * as log from "winston";
import * as PubSub from "pubsub-js";
import {
    ClientMessageFormat, SUBSCRIBE_TOPIC, UNSUBSCRIBE_TOPIC,
    PUBLISH_TOPIC
} from "../../common/messages/ws-messages";

export const wsClientHandler = (ws: WebSocket, user: User) => {
    let subscriptionTokens: {[key: string]: any} = {};

    ws.on('message', (msg) => {
        log.info("WebSocketServer | Message received: ", msg);
        const parsedMessage: ClientMessageFormat = JSON.parse(msg);

        if (!parsedMessage.args['topic']) {
            return sendMessageToClient(ws, 'Wrong command');
        }

        const topic = parsedMessage.args['topic'];

        switch (parsedMessage.cmd) {
            case SUBSCRIBE_TOPIC:
                subscriptionTokens[topic] = PubSub.subscribe(`${topic}`, (msg: any, data: any) => {
                    sendMessageToClient(ws, {topic: msg, data});
                });
                return;
            case UNSUBSCRIBE_TOPIC:
                if (subscriptionTokens[topic]) {
                    PubSub.unsubscribe(subscriptionTokens[topic]);
                }
                return;
            case PUBLISH_TOPIC:
            default:
                sendMessageToClient(ws, 'Wrong command');
        }


    });

    ws.on('close', () => {
        log.info("WebSocketServer | Client disconnected: ", user.email);
        Object.keys(subscriptionTokens).forEach((topic) => PubSub.unsubscribe(subscriptionTokens[topic]));
    });
};

function sendMessageToClient(client: WebSocket, msg: any) {
    client.send(JSON.stringify(msg));
}