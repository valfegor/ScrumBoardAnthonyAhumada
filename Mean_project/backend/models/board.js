//nuevamente exportamos a mongoose.

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    user_id:{type:mongoose.model.ObjectId,ref:'user'},
    name:String,
    description:String,
    taskStatus:boolean,
    imageUrl:String,
    date:{type:Date , default:Date.now},

});

const board = mongoose.model('board', boardSchema);

module.exports = board;