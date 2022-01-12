const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = db;
