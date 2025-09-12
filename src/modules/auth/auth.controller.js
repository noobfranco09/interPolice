import {
  getUsersDB,
  getUserporIdDB,
  createUserDB,
  updateUserDB,
  deleteUserDB,
  authUserDB,
  updateImageDb,
} from "./auth.model.js";

import { generarToken } from "../../../helpers/adminTokens.js";

export async function getAllUsers(req, res) {
  try {
    const users = await getUsersDB();
    if (users !== false) {
      res.status(200).send({
        status: "ok",
        data: users,
      });
    } else {
      res.status(404).send("No hay usuarios para mostrar");
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.code + "=>" + error.message,
    });
  }
}

export async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await getUserporIdDB(id);
    if (user !== false) {
      res.status(200).send({
        status: "ok",
        data: user,
      });
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
    });
  }
}

export async function createUser(req, res) {
  try {
    let data = req.body;
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!
    const result = await createUserDB(data);
    if (result !== false ) {
      res.status(200).send("Usuario creado con éxito");
    } else {
      res
        .status(400)
        .send(
          `El correo ${data.email} ya se encuentra asignado a otro usuario,por favor, intente con otro correo`
        );
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateUserDB(id, data);
    if (result !== false) {
      res.status(200).send({
        status: "ok",
        data: result,
      });
    } else {
      res.status(404).send("No se pudo encontrar o actualizar el usuario");
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await deleteUserDB(id);
    if (result !== false) {
      res.status(200).send({
        status: "ok",
        data: "User eliminado con éxito",
      });
    } else {
      res.status(400).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
}

export async function authUser(req, res) {
  try {
    let data = req.body;
    // Aquí debes añadir validaciones de entrada de datos --- passport-u otra libreria  !!!!!

    const user = await authUserDB(data);
    console.log(user);
    if (user!== false) {
      const token = generarToken(user[0], process.env.TOKEN_LIFE);
      res.status(200).send({
        status: "ok",
        user: user[0].email,
        foto: user[0].foto,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error interno del servidor",
    });
  }
}

export async function subirImagen(req, res) {
  try {
    const id = req.params.id;

    if (!req.file) {
      return res
        .status(400)
        .send({ status: "error", message: "No se subió archivo" });
    }

    // Construimos la URL accesible
    const imageUrl = `/images/users/${req.file.filename}`;

    // Guardar en DB
    const result = await updateImageDb(imageUrl, id);

    if (result !== false) {
      res.status(200).send({
        status: "ok",
        message: "Imagen subida correctamente",
        imageUrl,
      });
    } else {
      return res
        .status(404)
        .send({ status: "error", message: "Usuario no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Error interno del servidor" });
  }
}
