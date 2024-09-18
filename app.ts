import express from 'express';
const app = express();
import bodyParser from 'body-parser';
const port = 6600;
import dotenv from 'dotenv';
import { stablishConnection } from './db/connection';

// dotenv
dotenv.config();

// stablish connection
stablishConnection();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.listen(port,() => {
    process.stdout.write(`Server is up and running on port ${port}\n`);
})