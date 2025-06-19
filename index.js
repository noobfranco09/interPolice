import express from 'express'
import 'dotenv/config';
import ciudadano from './src/js/main.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/',ciudadano);
/* 
app.get('/ping', (req, res) => {
    res.send("pong")
 }) */

const port = process.env.APP_PORT || 3000;
app.listen(process.env.APP_PORT, () => { console.log(`Api ejecuntandose en el puerto ${port}`); })