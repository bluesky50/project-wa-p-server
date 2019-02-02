import { Server } from './classes/Server';
import serverConfig from './configs/serverConfig';

const server = new Server({ config: serverConfig, ormAdapter: null, app: null });

server.run();