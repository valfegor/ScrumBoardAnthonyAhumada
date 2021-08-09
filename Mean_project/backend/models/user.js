//tabla de usuario
//necesito nombre , email,password,role_id(esto se obtiene del role),la fecha y el estado

//vamos a ello.

//exporto la libreria mongoose

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        nombre:String,
        password:String,
        email:String,
        role_Id:{type:mongoose.Schema.ObjectId,ref:'role'},
        date:{type:Date,default:Date.now},
        dbStatus:Boolean,
});