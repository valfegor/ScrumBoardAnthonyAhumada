//hacemos uso de nuestro web token.

const jwt = require("jsonwebtoken");

//el middleware permite validar si el usuario registrado tiene permiso o no de realizar las tareas , para eso utilizamos el token , sin el token el usuario no debe de poder realizar estas acciones.

//el middleware siempre tiene el parametro next.
const auth = async (req,res,next) => {  
    //es la cabecera en la cabecera se envia el token
    let jwtToken = req.header("Authorization");

    //si el token es diferente o no tiene termina la ejecucion
    if(!jwtToken) return res.status(400).send("Invalid token");

    

}