//tabla de usuario
//necesito nombre , email,password,role_id(esto se obtiene del role),la fecha y el estado

//vamos a ello.

//exporto la libreria mongoose
//recordando usuario debe tener algunas validaciones de seguridad.

//librerias
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const moment = require("moment");


const userSchema = new mongoose.Schema({
        name:String,
        password:String,
        email:String,
        roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
        date:{type:Date,default:Date.now},
        dbStatus:Boolean,
});

//a nuestra schema procedemos a utilizar los metodos.

userSchema.methods.generateJWT = function(){

    return jwt.sign({
        _id:this._id,
        name:this.name,
        iat:moment().unix(),
        roleId: this.roleId,
    },process.env.SECRET_KEY_JWT
    );
};

const user = mongoose.model('user', userSchema);

module.exports = user;