import crearQr from "../../functions/generarQr.js";


export const traerTodosController = async (req, res) => {

    try {
        const query = "select * from ciudadano;";
        const [rows] = await conexion.query(query);
        console.log(rows);
        res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error interno del servidor");
    }
};

export const traerCiudadanoPorIdController = async (req, res) => {
    try {
        let codigo = req.params.id;
        let query = "select * from ciudadano where codigo = ?";
        let [rows] = await conexion.query(query, [codigo]);
        if (rows.length > 0) {
            res.status(200).send(rows);
        } else {
            res.status(300).send("Usuario inexistente");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error interno del servidor");
    }
};

export const crearCiudadanoController = async (req, res) => {
    try {
        let ciudadano = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            alias: req.body.alias,
            fechaNacimiento: req.body.fechaNacimiento,
            planetaOrigen: req.body.planetaOrigen,
            planetaResidencia: req.body.planetaResidencia,
            foto: req.body.foto,
            estado: req.body.estado,
        };

        let qr = await crearQr(ciudadano);
        if (qr.length > 0) {
            let ciudadano = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                alias: req.body.alias,
                fechaNacimiento: req.body.fechaNacimiento,
                planetaOrigen: req.body.planetaOrigen,
                planetaResidencia: req.body.planetaResidencia,
                foto: req.body.foto,
                qr: `${qr}`,
                estado: req.body.estado,
            };
            const query = "insert into ciudadano  set ?";
            await conexion.query(query, [ciudadano]);
            res.status(200).send("ciudadano creado con éxito");
        } else {
            let error = "algo falló en la creación del qr";
            throw error;
        }
    } catch (error) {
        console.log(`error en la creación del ciudadano : ${error}`);
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
        
    } catch (error) {
        
    }
 }