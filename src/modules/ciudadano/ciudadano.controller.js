import crearQr from "../../../functions/generarQr.js";
import * as model from "./ciudadano.model.js";
import {filtrarCampos} from "../../../helpers/camposPermitidos.js";
import { conexion } from "../../../config/conexionDb.js";

export const traerTodos = async (req, res) => {
  try {
    const rows = await model.traerTodosModel();
    if (rows) {
      res.status(200).send(rows);
    } else {
      res.status(300).send({ message: "No hay usuarios" });
    }
  } catch (error) {
    console.log(
      "Error en la consulta de traer todos en el controlador de ciudadano" +
        error
    );
    res.status(500).send("Error interno del servidor");
  }
};

export const traerCiudadanoPorId = async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const rows = await model.traerPorCodigo(codigo);
    if (rows !==false) {
      res.status(200).send(rows);
    } else {
      res.status(300).send({ message: "Usuario inexistente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
};

export const crearCiudadano = async (req, res) => {
  try {
    let ciudadano = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      alias: req.body.alias,
      fechaNacimiento: req.body.fechaNacimiento,
      planetaOrigen: req.body.planetaOrigen,
      planetaResidencia: req.body.planetaResidencia,
      estado: req.body.estado,
    };

    let qr = await crearQr(ciudadano);
    //matener este orden del objeto para que la consulta del modelo sea más corta
    if (qr.length > 0) {
      let ciudadano = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        alias: req.body.alias,
        fechaNacimiento: req.body.fechaNacimiento,
        planetaOrigen: req.body.planetaOrigen,
        planetaResidencia: req.body.planetaResidencia,
        qr: `${qr}`,
        estado: req.body.estado,
      };
      const rows = await model.crearCiudadano(ciudadano);
      if (rows) {
        res.status(200).send("ciudadano creado con éxito");
      } else {
        throw new Error({ message: "Error al crear el usuario" });
      }
    } else {
      throw new Error({ message: "Error al crear el qr" });
    }
  } catch (error) {
    console.log("error en la creación del ciudadano" + error);
    res.status(500).send("Error interno del servidor");
  }
};

export const editarCiudadano = async (req, res) => {
  const conn = await conexion.getConnection();
  try {
    await conn.beginTransaction();
    const codigo = req.params.codigo;
    const camposPermitidos = [
      "nombre",
      "apellido",
      "alias",
      "fechaNacimiento",
      "planetaOrigen",
      "planetaResidencia",
      "estado",
    ];
    let data = req.body;
    let ciudadano = filtrarCampos(data, camposPermitidos);
    if (ciudadano !== false) {
      const rows = await model.actualizarCiudadano(conn, ciudadano, codigo);
      if (rows.affectedRows > 0 ) {
        let ciudadanoActualizado = await model.traerDatosCiudadano(conn,codigo);
        if (ciudadanoActualizado !== null) {
          let qrCreado = await crearQr(ciudadanoActualizado);
          if (qrCreado.length > 0) {
            let qrActualizado = await model.actualizarCiudadano(
              conn,
              { qr: `${qrCreado}` },
              codigo
            );
            if (qrActualizado.affectedRows > 0 && qrActualizado) {
              await conn.commit();
              res.status(200).send("ciudadano editado con éxito");
            } else {
              await conn.rollback();
              res.status(500).send("Error interno del servidor");
            }
          }
        }else{
          await conn.rollback();
          res.status(404).send("Ciudadano no encontrado");
        }
      } else {
        res.status(404).send("No existe el ciudadano");
      }
    } else {
      throw new Error( "error en el la validación del objecto" );
    }
  } catch (error) {
    console.log(`error en la edición del ciudadano : ${error}`);
    res.status(500).send("Error interno del servidor");
  }
  finally{
    conn.release();
  }
};

export const eliminarCiudadano = async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const rows = await model.eliminarCiudadano(codigo)
    if (rows !== false) {
      res.status(200).send("Eliminado con éxito")
    }else{
      res.status(404).send("No se encontró el ciudadano")
    }
  } catch (error) {
    console.log("Error en el controlador de eliminar ciudadano")
    res.status(500).send({error:"error del servidor"})
  }
};


export async function subirImagen(req, res) {
  try {
    const codigo = req.params.codigo;

    if (!req.file) {
      return res
        .status(400)
        .send({ status: "error", message: "No se subió archivo" });
    }

    // Construimos la URL accesible
    const imageUrl = `/images/ciudadano/${req.file.filename}`;

    // Guardar en DB
    const result = await model.subirImagen(codigo,imageUrl);

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
