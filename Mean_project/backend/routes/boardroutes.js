const express = require("express");

const router = express.Router();

const Auth = require("../middleware/auth");

const Validate = require("../middleware/validate");

const boardController = require("../controller/boardcontroller");


router.post("/saveTask",Auth,Validate,boardController.saveTask);

router.get("/listTask",Auth,Validate,boardController.showTasks);

router.put("/updateTask",Auth,Validate,boardController.updateTask);

router.delete("/removeTask/:_id",Auth,Validate,boardController.removeTask);


module.exports = router;