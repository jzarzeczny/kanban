const express = require("express");
const router = express.Router();
const tasks = require("../Tasks");

router.get("/", (req, res) => {
   res.json(tasks);
});
router.post("/", (req, res) => {
   const newTask = {
      ...req.body,
   };
   tasks.push(newTask);
   res.json(tasks);
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
            task.content = updateTask.content
               ? updateTask.content
               : task.content;
            task.color = updateTask.color ? updateTask.color : task.color;
            task.position = updateTask.position
               ? updateTask.position
               : task.position;
            res.json({ message: "Task updated", header: task.header });
         }
      });
   } else {
      res.status(400).json({ message: "No task with id of " + req.params.id });
   }
});

router.delete("/:id", (req, res) => {
   const found = tasks.some((task) => {
      return task.id === parseInt(req.params.id);
   });
   if (found) {
      tasks.filter((task) => task.id !== parseInt(req.params.id));
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
