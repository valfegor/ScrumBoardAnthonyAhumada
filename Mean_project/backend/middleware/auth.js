//hacemos uso de nuestro web token.

const jwt = require("jsonwebtoken");

//el middleware permite validar si el usuario registrado tiene permiso o no de realizar las tareas , para eso utilizamos el token , sin el token el usuario no debe de poder realizar estas acciones.

//el middleware siempre tiene el parametro next.
const auth = async (req,res,next) => {  
    //es la cabecera en la cabecera se envia el token
    let jwtToken = req.header("Authorization");

    //si el token es diferente o no tiene termina la ejecucion
    if(!jwtToken) return res.status(400).send("Invalid token");

    //aqui valido y separo el bearer y me quedo solamente con el token
    jwtToken = jwtToken.split(" ")[1];

    //aqui si no existe el token no permitimos el ingreso
    if(!jwtToken) return res.status(400).send("invalid token");

    //hacemos un bloque trycatch

    try {
        //hacemos uso de nuestra variable payload.

        const payload = await jwt.verify(jwtToken,SECRET_KEY_JWT);
        
        req.user = payload;
        next();
    } catch (error) {
    return res.status(400).send("Authorization denied : Invalid token");       
    }

}