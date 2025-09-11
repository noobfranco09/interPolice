import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  authUser,
  subirImagen
} from "./auth.controller.js";
import fs from "fs";
import path from "path";
import {autenticacionMiddleware} from "../../../helpers/adminTokens.js";
import multer from "multer";
const router = express.Router();

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("./public/images/users");

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
// Rutas para Aprendices
router.get("/user",autenticacionMiddleware, getAllUsers);//listo pa usar, el middleware funciona
router.get("/user/:id",autenticacionMiddleware, getUserById);//listini también
router.post("/user", createUser);//lista para usar,me falta lo de la imágen zzzzzzz
router.post("/subirimagen/:id",autenticacionMiddleware,[subirImagenMulter.single('file0')],subirImagen)//funcionando a la perfección
router.post("/login", authUser);//listo pa usar, ya entrega el token
router.put("/user/:id",autenticacionMiddleware,updateUser);//funciona a la perfección, que maravilla
router.delete("/user/:id",autenticacionMiddleware,deleteUser);//también está listo

export default router;
