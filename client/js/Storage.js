class Storage {
   addToLocalStorage(task) {
      const oldData = this.getFromLocalStorage();
      const newData = [...oldData];
      newData.push(task);
      localStorage.setItem("taskList", JSON.stringify(newData));
   }
   delateItem(taskID) {
      const oldData = this.getFromLocalStorage();
      const newArray = oldData.filter((t) => {
         return t.id != taskID;
      });
      // Remove element
      document.getElementById(taskID).remove();
      localStorage.clear();
      localStorage.setItem("taskList", JSON.stringify(newArray));
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
   getFromLocalStorage() {
      const data = JSON.parse(localStorage.getItem("taskList")) || [];

      return data;
   }
}

export default Storage;
