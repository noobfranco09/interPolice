import mysql from 'mysql2/promise';

export const conexion = (async () => {
    try {
        const config = {
            host: process.env.HOST,
            user: process.env.DB_USER,
            database:process.env.DB_DATABASE,
            password:process.env.DB_PASSWORD
        };
        const pool = mysql.createPool();
        console.log("Conexión exitosa a la base de datos")
        return pool;
    } catch (error) {
        console.log("Error al intentar hacer la conexión")
        return ("error al crear la conexión")
    }
})