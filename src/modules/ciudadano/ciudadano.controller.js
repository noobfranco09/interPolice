import crearQr from "../../../functions/generarQr.js";
import * as model from "./ciudadano.model.js";

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
    if (rows && rows.length > 0) {
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
  try {
    const codigo = req.body.codigo;
    const query = "update ciudadano set estado = 0 where codigo = ?";
    let [rows] = await conexion.query(query, [codigo]);

    if (rows.affectedRows > 0) {
      res.status(200).send("ciudadano eliminado con éxito");
    } else {
      res.status(300).send("No existe el ciudadano");
    }
  } catch (error) {
    console.log(`error en la eliminación del ciudadano : ${error}`);
    res.status(500).send("Error interno del servidor");
  }
};

export const eliminarCiudadano = async (req, res) => {
  try {
  } catch (error) {}
};
