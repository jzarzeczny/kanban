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
const filePath = "./data.json";

const parsedData = JSON.parse(tasks);

router.get("/", (req, res) => {
   console.log(tasks);
   res.json(tasks);
});
router.post("/", (req, res) => {
   const newTask = {
      ...req.body,
   };

   // Update the content of tasks
   const newTasks = [...parsedData];
   newTasks.push(newTask);
   console.log(newTasks);
   fs.writeFileSync(filePath, JSON.stringify(newTasks), "utf-8", (err) => {
      if (err) throw err;
      console.log("Done");
      res.status(200);
   });
});

router.put("/:id", (req, res) => {
   console.log(req.params.id);
   const found = parsedData.some((task) => {
      return task.id === parseFloat(req.params.id);
   });

   if (found) {
      const updateTask = { ...req.body };
      parsedData.forEach((task) => {
         if (task.id === parseFloat(req.params.id)) {
            task.content = updateTask.content ? updateTask.content : task.content;
            task.position = updateTask.position ? updateTask.position : task.position;
         }
      });

      fs.writeFileSync(filePath, JSON.stringify(parsedData), "utf-8", (err) => {
         if (err) throw err;
         console.log("Done");
         res.json({ message: "Task list updated" });
      });
   } else {
      res.status(400).json({ message: "No task with id of " + req.params.id });
   }
});

router.delete("/:id", (req, res) => {
   const found = parsedData.some((task) => {
      console.log(task.id == req.params.id);
      return task.id == parseFloat(req.params.id);
   });
   if (found) {
      newData = parsedData.filter((task) => task.id !== parseFloat(req.params.id));
      fs.writeFile(filePath, JSON.stringify(newData), "utf-8", (err) => {
         console.log(`Delate item ${req.params.id}`);
         if (err) throw err;
      });
      res.status(200).json({
         newData,
      });
   } else {
      res.status(400).json({
         message: ` Task with id of ${req.params.id} not found`,
      });
   }
});

module.exports = router;
