const Role = require('../models/role');


const admin = async (req,res,next) => {
    //buscamos el rol de administrador.

    let role = await Role.findById(req.user.role_id);

}