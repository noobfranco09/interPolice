import {conexion} from "../../config/conexionDb.js";


export const traerTodosModel = async () => {
    try {
        const [query] = conexion.execute("select * from ciudadano");
        return query;
    } catch (error) {
        console.log("Error al ejecutar la consulta de traer todos");
        return false;
    }
}