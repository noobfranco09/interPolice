import { conexion } from "../../../config/conexionDb.js";

export const traerTodosModel = async () => {
  try {
    const [rows, field] = await conexion.execute("select * from ciudadano");
    if (rows) {
      return rows;
    } else {
      throw new Error({ error: "error al traer todos los ciudadanos" });
    }
  } catch (error) {
    console.log("Error al ejecutar la consulta de traer todos" + error);
    return false;
  }
};

export const traerPorCodigo = async (codigo) => {
  try {
    const [rows, field] = await conexion.execute(
      "select * from ciudadano where codigo = ?",
      [codigo]
    );
    if (rows) {
      return rows;
    } else {
      throw new Error({
        error: "Error al traer el ciudadano por codigo en el modelo",
      });
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crearCiudadano = async (ciudadano) => {
  try {
    const [rows, field] = await conexion.query("insert into ciudadano set ?", [ciudadano,]);
    if (rows) {
      return rows;
    } else {
      throw new Error({
        error: "Error al crear el ciudadano en el modelo",
      });
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
