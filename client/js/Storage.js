import Main from "./Main.js";

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
            const newData = JSON.parse(data.tasks);
         });

      // TODO UPDATE THE RENDER BASED ON THE RES
      // const oldData = this.getFromLocalStorage();
      // const newArray = oldData.filter((t) => {
      //    return t.id != taskID;
      // });
      // // Remove element
      // document.getElementById(taskID).remove();
      // localStorage.clear();
      // localStorage.setItem("taskList", JSON.stringify(newArray));
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
      });
   };

   async getFromLocalStorage() {
      // const data = JSON.parse(localStorage.getItem("taskList")) || [];
      const data = await fetch("http://localhost:5002/tasks")
         .then((response) => response.json())
         .then((data) => JSON.parse(data));
      return data;
   }
}

export default Storage;
