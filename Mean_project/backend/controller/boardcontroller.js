//aqui vamos a empezar a trabajar toda la logica referente a la creacion de el board.

const Board = require("../models/board");

const saveTask = async (req,res) => {

    //si alguno de los 2 campos esta vacio retornamos.

    if(!req.body.description || !req.body.name) return res.status(400).send("Please checkout the camps");


    const board = new Board ({
        user_id:req.body.user_id,
        description:req.body.description,
        name:req.body.name,
        taskStatus:"to-do",
    })

    const result = await board.save();

    if(!result) return res.status(400).send("Please Try again");

    return res.status(200).send({result});


}



module.exports = {saveTask}