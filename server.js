const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5002;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "client")));

app.use("/tasks", require("./routes/tasks"));

app.listen(PORT, (req, res) => {
   console.log(`Server is running on port ${PORT}`);
});
