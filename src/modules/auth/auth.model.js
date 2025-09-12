import { conexion } from "../../../config/conexionDb.js";
import bcrypt from "bcryptjs";
//implementa la encriptación con el algoritmo blouwFish con varias giros en la encriptación  salt

export async function getUsersDB() {
  try {
    const [rows] = await conexion.query("SELECT * FROM user where estado = 1");
    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUserporIdDB(id) {
  try {
    const [rows] = await conexion.query(
      "SELECT * FROM user WHERE id = ? and estado = 1",
      [id]
    );
    return rows.length > 0 ? rows : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createUserDB(userData) {
  try {
    let email = userData.email;

    const [emailExiste] = await conexion.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (emailExiste.length > 0) {
      return false;
    }

    const userNuevo = {
      email: userData.email,
      nombre: userData.nombre,
      apellido: userData.apellido,
      password: bcrypt.hashSync(userData.password, 11),
      telefono: userData.telefono,
    };

    const [result] = await conexion.query("INSERT INTO user SET ?", [
      userNuevo,
    ]);
    return result.affectedRows > 0 ? result : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateUserDB(id, userData) {
  try {
    const [result] = await conexion.query("UPDATE user SET ? WHERE id = ?", [
      userData,
      id,
    ]);
    return result.affectedRows > 0 ? result : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// ejemplo para la formacion: recordar que esto por ley NO se debe hacer
export async function deleteUserDB(id) {
  try {
    const [result] = await conexion.query(
      "UPDATE user set estado = 0 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0 ? result : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// autenticacion del usuario en un factor

export async function authUserDB(userData) {
  try {
    let email = userData.email;
    let password = userData.password;

    const [consultaRegistro] = await conexion.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (consultaRegistro.length > 0) {
      const siCoincide = bcrypt.compareSync(
        password,
        consultaRegistro[0].password
      );
      console.log(siCoincide);
      if (siCoincide) {
        return consultaRegistro;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateImageDb(imgUrl, id) {
  try {
    const [result] = await conexion.query(
      "update user set foto = ? where id = ?",
      [imgUrl, id]
    );
    return result.affectedRows > 0 ? result : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
