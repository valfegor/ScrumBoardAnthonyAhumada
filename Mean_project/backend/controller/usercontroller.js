//el controlador necesita el modelo (siempre)(no olvidar)
//recordemos que al importar el modelo que creamos
//este usuario contiene todos los 
const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");


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
    let role = Role.findOne({name:"user"});

    if(!role) return res.status(400).send("This person dont have any role");

    //si todos los pasos anteriores se cumplen , ahora si procederemos a guardar nuestro usuario.

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hash,
        //no olvidar el 
    })

}


const listUser = async (req,res) => {

}