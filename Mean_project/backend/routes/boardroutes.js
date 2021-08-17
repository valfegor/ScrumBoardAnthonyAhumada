const express = require("express");

const router = express.Router();


const boardController = require("../controller/boardcontroller");


router.post("/task",boardController.saveTask);


module.exports = router;