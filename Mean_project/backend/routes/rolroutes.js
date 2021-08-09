//en esta parte manejamos la libreria de express , en las rutas.

const express = require("express");

const router = express.Router();

const RoleController = require("../controller/rolcontroller");

router.post('/registerRole',RoleController.registerRole);
//http://localhost:3001/api/role/listrole
router.get('/listRole',RoleController.listRole);

//router es el que esta guardando toda la informacion
module.exports = router;