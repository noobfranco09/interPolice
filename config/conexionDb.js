import mysql from 'mysql2/promise';

export const conexion =( async () => {
    const config = {
        host: process.env.HOST,
        user:process.env,
        database,
        password

    };
    const pool = mysql.createPool();
    return pool;
})