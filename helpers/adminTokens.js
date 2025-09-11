import jwt from 'jsonwebtoken';

/* Librería para gestionar los tokens */


export const generarToken=(payload, vida)=>{
    const options = {
        expiresIn:vida
    };
    return jwt.sign(payload, process.env.SALT, options);
};

/* middleware para autenticar los tokens */

export const autenticacionMiddleware=(req,res,next)=>{
    try {
        //Llega el token desde la petición
            const token=req.headers.authorization;
            // console.log(token)
        // se valida el token
        if (!token) {
            throw new Error('error:token inválido o vacío');
            
        }

        //se compara el token del request con el token generado en el login
        let tokenOk =jwt.verify(token,process.env.SALT);
        console.log(token);
        next();
    } catch (error) {
        res.status(401).send({
            status:'error',
            message:'Usuario no autorizado.'
        })
    }
}