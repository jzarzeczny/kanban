const express = require("express");
const fs = require("fs");
const router = express.Router();

// Repair method!
// const d = [
//    {
//       id: 3,
//       header: "header",
//       content: "content",
//       color: "#D6D84F",
//    },
// ];
// fs.writeFileSync("../data.json", JSON.stringify(d), "utf-8", function (err) {
//    if (err) throw err;
//    console.log("Done");
// });
const tasks = fs.readFileSync("./data.json", "utf8", (err, data) => {
   if (err) console.log(err);
   return data;
});
parsedData = JSON.parse(tasks);

router.get("/", (req, res) => {
   console.log(tasks);
   res.json(tasks);
});
router.post("/", (req, res) => {
   const newTask = {
      ...req.body,
   };
   console.log("This is new task");
   console.log(newTask);

   // Update the content of tasks
   const filePath = "./data.json";
   const newTasks = [...parsedData];
   newTasks.push(newTask);
   // Those are new tasks
   console.log("This is a list of new tasks");
   console.log(newTasks);

   fs.writeFileSync(filePath, JSON.stringify(newTasks), "utf-8", (err) => {
      if (err) throw err;
      console.log("Done");
   });

   console.log(tasks);
});

router.put("/:id", (req, res) => {
   const found = tasks.some((task) => {
      return task.id === parseInt(req.params.id);
   });

   if (found) {
      const updateTask = { ...req.body };
      tasks.forEach((task) => {
         if (task.id === parseInt(req.params.id)) {
            task.header = updateTask.header ? updateTask.header : task.header;
            task.content = updateTask.content ? updateTask.content : task.content;
            task.color = updateTask.color ? updateTask.color : task.color;
            task.position = updateTask.position ? updateTask.position : task.position;
            res.json({ message: "Task updated", header: task.header });
         }
      });
   } else {
      res.status(400).json({ message: "No task with id of " + req.params.id });
   }
});

router.delete("/:id", (req, res) => {
   console.log(req.params.id);
   const found = parsedData.some((task) => {
      return task.id === parseInt(req.params.id);
   });
   if (found) {
      newData = parsedData.filter((task) => task.id !== parseInt(req.params.id));
      fs.writeFileSync(filePath, JSON.stringify(newData), "utf-8", (err) => {
         if (err) throw err;
         console.log(`Delate item ${task.id}`);
      });
      res.json({
         message: "Member delate",
      });
   } else {
      res.status(400).json({
         message: ` Task with id of ${res.params.id} not found`,
      });
   }
});

module.exports = router;
