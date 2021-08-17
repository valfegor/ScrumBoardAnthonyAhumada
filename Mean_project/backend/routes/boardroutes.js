const express = require("express");

const router = express.Router();

const Auth = require("../middleware/auth");

const Validate = require("../middleware/validate");

const boardController = require("../controller/boardcontroller");


router.post("/saveTask",Auth,Validate,boardController.saveTask);

router.get("/listTask",boardController.showTasks);


module.exports = router;