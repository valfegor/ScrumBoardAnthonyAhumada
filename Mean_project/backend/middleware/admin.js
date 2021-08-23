const Role = require('../models/role');


const admin = async (req,res,next) => {
    //buscamos el rol de administrador.
    //para buscar el rol hacemos uso de la informacion que tiene el jwt , en este apartado se encuentra el role_id , de esta manera al buscar me trae si si es admin el usuario o no lo es
    let role = await Role.findById(req.user.role_id);

    if(!role) return res.status(400).send("Sorry that role does not exist.");

    if(role.name=="Admin") next();
    else return res.status(400).send("Sorry you dont have the access please search a administrator");



}


module.exports = admin;