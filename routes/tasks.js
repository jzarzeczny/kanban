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
// fs.writeFileSync("./data.json", JSON.stringify(d), "utf-8", function (err) {
//    if (err) throw err;
//    console.log("Done");
// });

const FILE_PATH = "./data.json";

router.get("/", async (req, res) => {
   const data = await readTheStorage(FILE_PATH);
   res.json(data);
});
router.post("/", async (req, res) => {
   const newTask = {
      ...req.body,
   };

   // Update the content of tasks
   const newTasks = await readTheStorage(FILE_PATH);
   newTasks.push(newTask);
   fs.writeFileSync(FILE_PATH, JSON.stringify(newTasks), "utf-8", (err) => {
      if (err) throw err;
      console.log("Done");
   });
   res.status(200).json({ message: "Task added" });
});

router.put("/:id", (req, res) => {
   const data = readTheStorage(FILE_PATH);

   const found = data.some((task) => {
      return task.id === parseFloat(req.params.id);
   });

   if (found) {
      const updateTask = { ...req.body };
      data.forEach((task) => {
         if (task.id === parseFloat(req.params.id)) {
            task.content = updateTask.content ? updateTask.content : task.content;
            task.position = updateTask.position ? updateTask.position : task.position;
         }
      });

      fs.writeFileSync(FILE_PATH, JSON.stringify(data), "utf-8", (err) => {
         if (err) throw err;
         console.log("Done");
         res.json({ message: "Task list updated" });
      });
      res.status(200).json({ message: `Task updated` });
   } else {
      res.status(400).json({ message: "No task with id of " + req.params.id });
   }
});

router.delete("/:id", (req, res) => {
   const data = readTheStorage(FILE_PATH);

   const found = data.some((task) => {
      return task.id == parseFloat(req.params.id);
   });
   if (found) {
      newData = data.filter((task) => task.id !== parseFloat(req.params.id));
      fs.writeFileSync(FILE_PATH, JSON.stringify(newData), "utf-8", (err) => {
         console.log(`Delate item ${req.params.id}`);
         if (err) throw err;
      });
      res.status(200).json({
         message: "Task removed",
      });
   } else {
      res.status(400).json({
         message: ` Task with id of ${req.params.id} not found`,
      });
   }
});

function readTheStorage(filePath) {
   const tasks = fs.readFileSync(filePath, "utf8", (err, data) => {
      console.log(data);
      if (err) console.log(err);
      return data;
   });

   const parsedTasks = JSON.parse(tasks);
   return parsedTasks;
}

module.exports = router;
