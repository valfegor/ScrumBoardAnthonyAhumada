const User = require('../models/user');


const user = async (req,res,next) => {
    //Recordemos que aqui buscamos por ID.

    const user = User.findById(req.user._id);

    if(!user) return res.status(400).send("Authorization denied.");

    next();

}


module.exports = user;