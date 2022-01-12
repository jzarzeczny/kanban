const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5002;
const mongoRouter = require("./routes/mongoTask");
require("dotenv").config({ path: "./config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client")));
app.use("/mongo", mongoRouter);
app.use("/tasks", require("./routes/tasks"));

app.listen(PORT, (req, res) => {
   console.log(`Server is running on port ${PORT}`);
});
