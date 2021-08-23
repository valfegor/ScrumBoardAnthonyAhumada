//aqui vamos a empezar a trabajar toda la logica referente a la creacion de el board.

const Board = require("../models/board");
const mongoose = require("mongoose");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

const saveTask = async (req, res) => {
  //si alguno de los 2 campos esta vacio retornamos.

  if (!req.body.description || !req.body.name)
    return res.status(400).send("Please checkout the camps");

  const board = new Board({
    user_id: req.user_id,
    description: req.body.description,
    name: req.body.name,
    taskStatus: "to-do",
  });

  const result = await board.save();

  if (!result) return res.status(400).send("Please Try again");

  return res.status(200).send({ result });
};

const showTasks = async (req, res) => {
  const board = await Board.find({ user_id: req.user._id });

  if (!board) return res.status("No task saved yet");

  return res.status(200).send({ board });
};

//updateTask.
const updateTask = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");
  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send("Sorry Please check all the camps");

  let board = await Board.findByIdAndUpdate(req.body._id, {
    user_id: req.user._id,
    taskStatus: req.body.taskStatus,
  });

  if (!board) return res.status(400).send("Sorry try again");

  return res.status(200).send({ board });
};

const removeTask = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");
  if (!req.params._id) return res.status("Check the camps noob");

  let board = await Board.findOneAndDelete(req.params._id);

  if (!board) return res.status("Sorry please try again");

  return res.status(200).send({ board });
};

//funcion de guardar imagen
const saveTaskImg = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");
  //necesitamos generar una URL para cargar la imagen
  let imageUrl = ""; //http://localhost:3001/
  console.log(req.files);
  //si viene la imagen o si viene otro tipo de archivo no soportado
  if (req.files !== undefined && req.files.image.type) {
    //la palabra protocol es la primera parte de la url es decir el protocolo HTTP del request obtenemos el host que llegue
    let url = req.protocol + "://" + req.get("host") + "/";
    //aqui va a quedar la imagen en nuestro servidor
    //queda de la siguiente manera //http:localhost:3001/uploads/57485 -c:user/desktop/js.png (codigo que saquemos por fecha) el path + el nombre de la extension
    //el path es la ruta de donde se cargo , es decir sacar la extension
    let serverImg =
      "./uploads/" + moment().unix() + path.extname(req.files.image.path);
    //leer se encarga de tomar el archivo , por favor cargue la imagen
    //Despues de leer se escribe es la carpeta donde va a quedar guardado como se llama y la extension , ya con esta linea queda guardado en la carpeta uploads.
    fs.createReadStream(req.files.image.path).pipe(
      fs.createWriteStream(serverImg)
    );
    //en la bd vamos a guardar un campo.

    imageUrl =
      url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
  }
  let board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: imageUrl,
  });

  let result = await board.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });
};

module.exports = { saveTask, showTasks, updateTask, removeTask ,saveTaskImg};
