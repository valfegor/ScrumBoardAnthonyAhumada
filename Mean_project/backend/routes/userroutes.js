//en las rutas siempre utilizamos express.

const express = require("express");

const router = express.Router();

//tramos nuestro controlador.

const Usercontroller = require("../controller/usercontroller");

router.post("/user/register",Usercontroller.registerUser);


//aqui me olvide de exportar mi router.

module.exports = router;