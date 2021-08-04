//Aqui me toco ir a revisar por que no me acordaba
//debo tener presente que voy a utilizar la libreria de moongose para la conexion con mongo.

const mongoose = require("mongoose");

//conexion asincrona con trycatch
//se utiliza la funcion por defecto que trae mongoose que es .connect
//por medio de los parametros se envian 2 la url 
//se pasan 4 pripiedades a tener en cuenta
//por defecto estas propiedades , vienen en true o en algun otro tipo de dato
//(primer parámetro la url , segundo parámetro configuraciones de seguridad para mongo)

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.BD_CONNECTION,{
            useNewUrlParser:true,
            useFindAndModify:false,
            useCreateIndex:true,
            useUnifiedTopology:true

        })
        //si todo funciona
        console.log("Master your connection set up succesfully =) In mongo DB")
    } catch (e) {
        console.log("Master please checkout im not working",e);
        //consola del navegador.
        throw new Error("Master i dont have ammo =/");
    }
}


//module exports exporta nuestra dbConnection
//siempre se inicia con module.exports.

module.exports={dbConnection}
