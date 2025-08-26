import express from "express";
import * as controller from './ciudadano.controller.js';
const ruta = express.Router();

ruta.get('/ciudadano',controller.traerTodos);
ruta.get('/ciudadano/:id',controller.traerCiudadanoPorId);
ruta.post('/ciudadano',controller.crearCiudadano);
// ruta.put('/ciudadano/:id');
// ruta.delete('/ciudadano/:id');

export default ruta;
// se usa default cuando es un objecto, como es un objecto se exporta una sola vez y 
// cuando se requiera se hace sin llaves, además, se llaman sus métodos con '.'