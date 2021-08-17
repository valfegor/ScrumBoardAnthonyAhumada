const express = require("express");

const router = express.Router();


const boardController = require("../controller/boardcontroller");


router.post("/saveTask",boardController.saveTask);

router.get("/listTask",boardController.showTasks);


module.exports = router;