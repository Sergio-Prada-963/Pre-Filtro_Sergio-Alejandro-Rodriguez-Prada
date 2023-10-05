import {config} from 'dotenv';
config();
import Server from './app/server.js'
const server = new Server()
server.listen()