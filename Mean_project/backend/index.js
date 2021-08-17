//utilizamos nuestra libreria de express , para que nos ayude con el servidor

const express = require("express");

//llamamos nuestro cors para que nos ayude a validar que todo este correctamente si algo viene desde un framework o que tampoco sea inyeccion de codigo.

const cors = require("cors");

//de esta manera cargamos nuestra conexion a mongo
const {dbConnection} = require('./bd/bd');

//aqui llamo a la ruta con la variable ROle
const Role = require("./routes/rolroutes");

//aqui llamo la ruta de los usuarios.

const User = require("./routes/userroutes");

//llamado a la ruta de autenticacion del login.

const Login = require("./routes/authroutes");


const Task = require("./routes/boardroutes");
//requiere la libreria que instalamos dotenv para configurar todas las variables de entorno
//si no esta esta linea genera fallos a la hora de generar los archivos.

require('dotenv').config();

//aqui se construye el servidor express
const app = express();

//nuestro servidor va a utilizar todo lo de express , va a utilizar formato .json
//las reglas de backend seran utilizadas por cors

app.use(express.json());
app.use(cors());
//esta es la ruta que va a utilizar nuestra aplicacion
app.use("/api/role",Role);
//aqui colocamos nuestra ruta.
app.use("/api/user",User);

//ruta de login.

app.use("/api/log",Login);
app.listen(process.env.PORT,()=>console.log("Backend Server Running  Ok On Port",process.env.PORT))

//Esta parte se me olvido y me toco revisar como un pendejo -.-
dbConnection();
