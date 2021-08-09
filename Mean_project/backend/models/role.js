//Aqui se instancia el modelo , lo que vamos a recibir , los datos que envia el json.

//siempre se debe utilizar la libreria mongoose.

const mongoose = require('mongoose');

//De esta manera creamos los datos que recibe el json.
const roleSchema = new mongoose.Schema({
    name:String,
    description:String,
    date:{type:Date,default:Date.now},
    dbStatus:Boolean,
});

//Ya cuando obtengamos los datos mongo los va a guardar en su coleccion.

const role = mongoose.model('role', roleSchema);

module.exports = role;