import qrCode from "qrcode";
import { join } from "path";
import { mkdirSync } from "fs";
import conexion from "../conexionDataBase/conexion.js";
async function crearQr(objeto) {
    try {
        //Se hace una consulta a la base de datos para traer el último codigo y se le suma uno para que cada qr quede correspondiente a su ciudadano
        // si la base de datos está vacía,se inicia en 1
    const query = "SELECT codigo FROM ciudadano ORDER BY codigo DESC LIMIT 1;";
      const [rows] = await conexion.query(query);
      let codigo;
      if (rows.length > 0) {
          codigo = rows[0].codigo+1;
      } else {
          codigo = 1;
       }
    const nombreArchivo = codigo+ objeto.nombre;
    const carpetaQr = "../public/images";
    //si la carpeta no existe se crea
    mkdirSync(carpetaQr, { recursive: true });

    //se crea la ruta completa en donde se almacenará cada qr
    // si el qr ya existe con un nombre,este se va a sobreescribir cuando se guarde un qr con el mismo nombre
    const rutaCompleta = join(carpetaQr, `${nombreArchivo}.png`);
    // se parsea el objeto a string porque la librería trabaja con texto
    const texto = JSON.stringify(objeto);

    // se guarda el qr en la ruta que se dio, en este caso es la variable ruta completa, que tiene el nombre de la carpeta y el nombre del archivo
    //El nombre del archivo es el código que es único, y su nombre
    await qrCode.toFile(rutaCompleta, texto);
    return rutaCompleta;
  } catch (error) {
    console.log(`Error en la función de creación del qr ${error} `);

    return "";
  }
}
export default crearQr;
