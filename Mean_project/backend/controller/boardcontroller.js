//aqui vamos a empezar a trabajar toda la logica referente a la creacion de el board.

const Board = require("../models/board");
const mongoose = require("mongoose");

const saveTask = async (req,res) => {

    //si alguno de los 2 campos esta vacio retornamos.

    if(!req.body.description || !req.body.name) return res.status(400).send("Please checkout the camps");


    const board = new Board ({
        user_id:req.user_id,
        description:req.body.description,
        name:req.body.name,
        taskStatus:"to-do",
    })

    const result = await board.save();

    if(!result) return res.status(400).send("Please Try again");

    return res.status(200).send({result});


}


const showTasks=async (req,res) => {
    const board = await Board.find({user_id:req.user._id});

    if(!board) return res.status("No task saved yet");

    return res.status(200).send({board});

}


//updateTask.
const updateTask = async (req,res) => {
    let validId = mongoose.Types.ObjectId.isValid(req.body._id);
    if (!validId) return res.status(400).send("Invalid id");
    if(!req.body._id || !req.body.taskStatus) return res.status(400).send("Sorry Please check all the camps");

    let board = await Board.findByIdAndUpdate(req.body._id,{
        user_id:req.user._id,
        taskStatus:req.body.taskStatus,

    })

    if(!board) return res.status(400).send("Sorry try again");

    return res.status(200).send({board});
}


const removeTask = async (req,res) => {
    let validId = mongoose.Types.ObjectId.isValid(req.params._id);
    if (!validId) return res.status(400).send("Invalid id");
    if(!req.params._id) return res.status("Check the camps noob");

    let board = await Board.findOneAndDelete(req.params._id);

    if(!board) return res.status("Sorry please try again");

    return res.status(200).send({board});
}



module.exports = {saveTask,showTasks,updateTask,removeTask}