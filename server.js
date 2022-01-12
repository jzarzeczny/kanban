const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5002;
const db = require("./db/conn");
const mongoRouter = require("./routes/mongoTask");

const PATH_TO_API = "/mongo";

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client")));
app.use(PATH_TO_API, mongoRouter);

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});
