import Main from "./main.js";

class Storage {
   async addItem(task) {
      await fetch("http://localhost:5002/tasks", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(task),
      });
   }
   async delateItem(taskID) {
      await fetch(`http://localhost:5002/tasks/${taskID}`, {
         method: "DELETE",
      }).then((res) => res.json());
   }
   updateItem = async (task) => {
      const taskObject = {
         id: task.id,
         content: task.content,
         position: task.position,
      };
      const response = await fetch(`http://localhost:5002/tasks/${task.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(taskObject),
      });
      const message = await response.json();
      console.log(message);
   };

   async getData() {
      const data = await fetch("http://localhost:5002/tasks")
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            return data;
         });
      return data;
   }
}

export default Storage;
