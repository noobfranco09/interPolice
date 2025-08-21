import mysql from 'mysql2/promise'
let conexion;
try {
     conexion = await mysql.createConnection({
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
     })
    console.log("conexión exitosa");
} catch(error) {
    console.error(`Error al conectar ${error}`);
    
}
 
export default conexion;