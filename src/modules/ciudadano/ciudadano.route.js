import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import * as controller from "./ciudadano.controller.js";
const ruta = express.Router();
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("./public/images/ciudadano");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, "user-" + Date.now() + file.originalname);
  },
});
const subirImagenMulter =multer({storage:almacenamiento})
ruta.get("/ciudadano", controller.traerTodos);
ruta.get("/ciudadano/:codigo", controller.traerCiudadanoPorId);
ruta.post("/ciudadano", controller.crearCiudadano);
ruta.patch("/ciudadano/:codigo", controller.editarCiudadano);
ruta.delete("/ciudadano/:codigo", controller.eliminarCiudadano);
ruta.post("/ciudadano/subirfoto/:codigo",[subirImagenMulter.single('file0')],controller.subirImagen);

export default ruta;
// se usa default cuando es un objecto, como es un objecto se exporta una sola vez y
// cuando se requiera se hace sin llaves, además, se llaman sus métodos con '.'
