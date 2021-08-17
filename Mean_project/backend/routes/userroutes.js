//en las rutas siempre utilizamos express.

const express = require("express");

const router = express.Router();

const Auth = require("../middleware/auth");

const Validate = require("../middleware/validate");

//tramos nuestro controlador.

const Usercontroller = require("../controller/usercontroller");

router.post("/register",Usercontroller.registerUser);

//el ? significa que puede o no ser obligatorio para entregar la consulta
router.get('/listUser/:name?',Auth,Validate,Usercontroller.listUser);


//aqui me olvide de exportar mi router.

module.exports = router;