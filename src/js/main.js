import express from 'express';
import conexion from './mySql.js';

const ciudadano = express();

ciudadano.get('ciudadanos', async (req, res) => {
    try {
        const query = "select * from ciudadano";
        const [rows] = await conexion.query(query);
        console.log(rows);
        res.send(rows);
        res.status(200);
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})
 
export default ciudadano;