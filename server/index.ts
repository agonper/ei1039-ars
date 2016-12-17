import {Server} from "./initializers/server";
import {serverConfig} from "./config/environment";
import {PassportInitializer} from "./initializers/passport";

const server = new Server(serverConfig);

server.start();