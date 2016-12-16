import {Server} from "./initializers/server";
import {serverConfig} from "./config/environment";

const server = new Server(serverConfig);

server.start();