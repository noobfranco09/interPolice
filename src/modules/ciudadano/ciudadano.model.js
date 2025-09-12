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
    return rows.length>0 ? rows :false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crearCiudadano = async (ciudadano) => {
  try {
    const [rows, field] = await conexion.query("insert into ciudadano set ?", [
      ciudadano,
    ]);
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

export const actualizarCiudadano = async (conn, ciudadano, codigo) => {
  try {
    const [rows, field] = await conn.query(
      "update ciudadano set ? where codigo = ?",
      [ciudadano, codigo]
    );
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

export const traerDatosCiudadano = async (conn, codigo) => {
  try {
    const [rows, field] = await conn.query(
      "select * from ciudadano where codigo = ?",
      [codigo]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const eliminarCiudadano = async (codigo) => {
  try {
    const [rows, field] = await conexion.query(
      "update ciudadano set estado = 0 where codigo = ?",
      [codigo]
    );
    return rows.affectedRows > 0 ? rows : false;
  } catch (error) {
    console.log("Error al ejecutar la consulta de eliminarCiudadano" + error);
    return false;
  }
};

export const subirImagen = async (codigo, urlImagen) => {
  try {
    const [rows, field] = await conexion.query(
      "update ciudadano set foto = ? where codigo = ?",
      [urlImagen, codigo]
    );
    return rows.affectedRows > 0 ? rows : false;
  } catch (error) {
    console.log("Error al ejecutar la consulta de eliminarCiudadano" + error);
    return false;
  }
};
