const mongoDB = require("../config");
const mongoose = require("mongoose");

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = db;
