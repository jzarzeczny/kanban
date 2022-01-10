import Main from "./main.js";

class Storage {
   async addToLocalStorage(task) {
      await fetch("http://localhost:5002/tasks", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(task),
      }).then(() => console.log("all good!"));
   }
   async delateItem(taskID) {
      await fetch(`http://localhost:5002/tasks/${taskID}`, {
         method: "DELETE",
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data.newData);
            // const newData = JSON.parse(data.tasks);
            const main = new Main();
            main.run();
         })
         .catch((e) => console.log(e));

      // TODO UPDATE THE RENDER BASED ON THE RES
   }
   updateItem = async (task) => {
      const taskObject = {
         id: task.id,
         content: task.content,
         position: task.position,
      };
      await fetch(`http://localhost:5002/tasks/${task.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(taskObject),
      }).then((res) => console.log(res));
   };

   async getFromLocalStorage() {
      const data = await fetch("http://localhost:5002/tasks")
         .then((response) => response.json())
         .then((data) => JSON.parse(data));
      return data;
   }
}

export default Storage;
