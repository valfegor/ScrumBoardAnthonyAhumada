//en esta parte manejamos la libreria de express , en las rutas.

const express = require("express");

const router = express.Router();

const RoleController = require("../controller/rolcontroller");

const Auth = require("../middleware/auth");

const Validate = require("../middleware/validate");

router.post('/registerRole',RoleController.registerRole);
//http://localhost:3001/api/role/listrole
router.get('/listRole',Auth,Validate,RoleController.listRole);

//router es el que esta guardando toda la informacion
module.exports = router;