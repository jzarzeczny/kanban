class Storage {
   async addToLocalStorage(task) {
      await fetch("http://localhost:5002/tasks", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: task,
      }).then(() => console.log("all good!"));
   }
   async delateItem(taskID) {
      await fetch(`http://localhost:5002/${taskID}`, {
         method: "DELETE",
      });
      // const oldData = this.getFromLocalStorage();
      // const newArray = oldData.filter((t) => {
      //    return t.id != taskID;
      // });
      // // Remove element
      // document.getElementById(taskID).remove();
      // localStorage.clear();
      // localStorage.setItem("taskList", JSON.stringify(newArray));
   }
   updatePositionLocalStorage = (task) => {
      const oldArray = this.getFromLocalStorage();
      const elementToChange = oldArray.filter((t) => t.id == task.id)[0];
      elementToChange.position = task.position;
      const newArray = oldArray.filter((t) => t.id != task.id);
      newArray.push(elementToChange);
      localStorage.clear();
      localStorage.setItem("taskList", JSON.stringify(newArray));
   };
   updateValueLocalStorage = (task) => {
      const oldArray = this.getFromLocalStorage();
      const elementToChange = oldArray.filter((t) => t.id == task.id)[0];
      elementToChange.content = task.children[1].value;
      const newArray = oldArray.filter((t) => t.id != task.id);
      newArray.push(elementToChange);
      localStorage.clear();
      localStorage.setItem("taskList", JSON.stringify(newArray));
   };
   async getFromLocalStorage() {
      // const data = JSON.parse(localStorage.getItem("taskList")) || [];
      console.log("hi api");
      const data = await fetch("http://localhost:5002/tasks").then((response) => response.json());

      if (!data) {
         data = [];
      }

      return data;
   }
}

export default Storage;
