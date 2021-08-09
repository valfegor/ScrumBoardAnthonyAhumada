//aqui va toda la logica.
//es decir retomando el controllador debe hacer uso de el modelo
//en el modelo se definio la estructura que va a tener el jsonwebtoken
//ahora desde aqui empezamos a generar la logica 

const Role = require("../models/role");


//genero mis 2 funciones.

const registerRole = async(req,res)=>{
    //aqui empezamos a diagramar.

    if(!req.body.name || !req.body.description)return res.status(401).send("The process fail please read the data");

    //si todos los datos estan completos lo que debe validar es si un usuario ya existe

    //en este caso lo que decimos es buscar en la base de datos este nombre que estoy pasando
    const existingRole = await Role.findOne({name:req.body.name});
    if(existingRole)return res.status(401).send("Process failer : role already exist");

    //si no existe entonces ya puede empezar a guardarlo

    //creamos nuestra clase Role recibimos los datos del modelo
    const role = new Role ({
        name:req.body.name,
        description:req.body.description,
        dbStatus:true,
    });

    //hora de guardar los datos es parecido a un push.

    const result = await role.save();

    if(!result) return res.status(401).send("Cant Save please try again");

    //si si guarda

    return res.status(200).send({role});

}


const listRole = async(req,res)=>{
    //aqui buscamos en la base de datos Role
    const role = await Role.find();
    if(!role) return res.status(401).send("The role dont exist");
    //si si lo encuentra devuelvo el role = el role es el de arriba
    return res.status(200).send({role});
};

//aqui exporto las funciones
module.exports = {registerRole,listRole};