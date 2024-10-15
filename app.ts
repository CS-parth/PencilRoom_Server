import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const port = 6600;
import dotenv from 'dotenv';
import { stablishConnection } from './db/connection';

import { createServer } from 'node:http'; // createServer is from node:http
const server = createServer(app); // app is a callback function used to make servers {ie: http or https}
import { Server } from 'socket.io';
import Socket from './socket';
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173','http://localhost:5174'],
        methods: ['GET','POST']
    }
})
Socket(io);
// cors
import cors from 'cors'
app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'],
    methods: ['GET','POST']
}));
// dotenv
dotenv.config();
// stablish connection
stablishConnection();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

server.listen(port,() => { // server provides the reusablity of the http servet to utilize the socket.io
    process.stdout.write(`Server is up and running on port ${port}\n`);
})