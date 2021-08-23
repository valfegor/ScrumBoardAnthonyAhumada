//el controlador necesita el modelo (siempre)(no olvidar)
//recordemos que al importar el modelo que creamos
//este usuario contiene todos los 
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const mongoose = require("../models/mongoose");


const registerUser = async (req,res) => {
    //si en el cuerpo del JSON cuando recibo la peticion post este no tiene el nombre o el email o la contraseña enviamos el status de que dejo campos sin llenar
    if(!req.body.name || !req.body.email || !req.body.password) return res.status(400).send("Please checkout you have some parts with out fill");

    //inicializamos una variable para validar si el correo electronico existe

    const existUser = await User.findOne({email:req.body.email});

    //si existe el usuario es decir si lo anterior es true , terminamos la ejecucion del programa indicando que ya existe el correo electronico.
    if(existUser)return res.status(400).send("You have already one email");

    //ahora vamos a encriptar nuestra contraseña que recibimos
    //utilizamos nuestra libreria hash , en esta libreria utilizamos el metodo de hash para transformar nuestra cotraseña

    let hash = await bcrypt.hash(req.body.password,10);

    //ahora el rol vamos a generar el rol
    //utilizamos una constante para validar si existe el rol , Aqui en esta parte en la base de datos ya debe estar creado el usuario con nombre user
    //recordar siempre colocar el await tuve un fallo en esta parte del codigo y al realizar la busqueda no me traia el rol por que estaba undefined
    let role = await Role.findOne({name:"user"});

    

    if(!role) return res.status(400).send("This person dont have any role");

    //si todos los pasos anteriores se cumplen , ahora si procederemos a guardar nuestro usuario.
    //recordemos este es el json que vamos a guardar en nuestra base de datos
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hash,
        roleId:role._id,
        dbStatus:true,
    })

    console.log(user.roleId);
    //almacenamos en una variable para confirmar si efectivamente se guardo o no 
    const result = user.save();

    //si no se guarda se ejecuta esta sentencia
    if(!result)return res.status(400).send("sorry try again");

    //pero si si guarda realizamos un trycatch ya que realizamos nuevamente una coneccion a la base de datos.

    try {
        let jwt = user.generateJWT();
        return res.status(200).send({jwt});
    } catch (e) {
        return res.status(400).send("sorry cant save",e);
    }
    

}


const listUser = async (req,res) => {
    //el parametro el filtro por el cual va a buscar esto esta en rutas
    //el param tiene los parametros que tiene en la url , es lo qeu viene pegado a la url
    //expresion regular un nombre o algo parecido o un vacio
    //Expresion regular
    //populate
    let user = await User.find({name: new RegExp(req.params["name"],"i")}).populate("roleId").exec();

    //si no hay array o si esta vacio retornamos que no hay usuarios
    if(!user || user.length === 0) return res.status(401).send("No hay usuarios");

    return res.status(200).send({user});
}

//exportamos nuestro modulo.
const UpdateUser = async (req,res) => {
    if(!req.body._id || !req.body.name || !req.body.email || !req.body.roleId) return res.status(400).send("Please check all the camps");

    let pass = "";

    if(req.body.password){
        pass = bcrypt.hash(req.body.password,10);
    }
    else{
        let userFind = await User.findOne({email: req.body.email});
        pass = userFind.password;
    }


    let user = await User.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
        password:pass,
        roleId:req.body.roleId,
    })

    if(!user) return res.status(400).send("Sorry please try again.");

    return res.status(200).send({user});
}

//en delete user se desactiva
const DeleteUser = async (req,res) => {
    if(!req.body._id) return res.status(400).send("Please check the data");

    //buscamos el usuario por el _id

    let user = await User.findByIdAndUpdate(req.body._id,{
        dbStatus:true,
    })

    if(!user) return res.status(400).send("Sorry please try again.");

    return res.status(200).send({user});
}



//registrando el administrator


const registerAdmin = async (req,res) => {
    if(!req.body.name || !req.body.password || !req.body.email || !req.body.roleId) return res.status(400).send("Sorry please check the camps");
    
    //validamos que el id_pertenezca a nuestra base y no sea inyectado.

    let validId = await mongoose.Types.ObjectId.isValid(req.body.roleId);
     if (!validId) return res.status(400).send("Invalid role ID");

    //igual que en el de los usuarios validamos que el correo no exista.

    const existingEmail = await User.findOne({email:req.body.email});

    if(existingEmail)return res.status("Sorry the email is already taken");

    const hash = await bcrypt.hash(req.body.password,10);

    let user = new User({
        name:req.body.name,
        password:hash,
        email:req.body.email,
        dbStatus:true,
        roleId:req.body.roleId,
    })

    let result = await user.save();

    if(!result) return res.status(400).send("Sorry try again");

    try {
        let jwt = user.generateJWT();
        return res.status(200).send({jwt});
    } catch (e) {
        return res.status(400).send("Please try again",e)
    }

}

module.exports = {registerUser,listUser,UpdateUser,DeleteUser,registerAdmin};