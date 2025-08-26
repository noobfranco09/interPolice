import express from "express";
import * as controller from './ciudadano.controller.js';
const app = express.Router();

app.get('/ciudadano',controller.traerTodosController);
app.get('/ciudadano/:id',controller.traerCiudadanoPorIdController);
app.post('/ciudadano',controller.crearCiudadanoController);
app.put('/ciudadano/:id');
app.delete('/ciudadano/:id');

export default app;
// se usa default cuando es un objecto, como es un objecto se exporta una sola vez y 
// cuando se requiera se hace sin llaves, además, se llaman sus métodos con '.'