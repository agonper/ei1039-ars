import {Server} from "./server";
import {configLoader} from "./config/environment";

const serverConfig = configLoader();
const server = new Server(serverConfig);

server.start();