//aqui voy a controlar el proceso de logeo del usuario a nuestra app.

//utilizamos el bcrypt ya que con el vamos a comprara la contraseña.

const bcrypt = require('bcrypt');

//llamamos a nuestro modelo usuario ya que en el vamos a comprar es decir el proceso es el siguiente (el usuario se registra y se guarda en la bd , y utilizamos la base para validar los datos que se encuentren almacenados en esa coleccion).

//recordemos que User me trae todos los metodos es decir puedo hacer uso del jwt


const User = require('../models/user');

const login = async (req,res) => {
    //aqui le envio el correo electronico
    let user = await User.findOne({email:req.body.email});
}