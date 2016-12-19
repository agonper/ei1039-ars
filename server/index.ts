import {Server} from "./initializers/server";
import {serverConfig} from "./config/environment";
import {DbInitializer} from "./initializers/database";

const server = new Server(serverConfig);
const dbInitializer = new DbInitializer(serverConfig);

dbInitializer.start().then(() => {
    server.start();
});
