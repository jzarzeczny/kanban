const mongoDB = require("../config");

const mongoose = require("mongoose");

console.log(mongoDB);

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
   header: String,
   content: String,
   color: String,
   position: Number,
   id: Number,
});
module.exports = db;
