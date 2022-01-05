import Task from "./Task.js";

class Storage {
  task = new Task();

  addToLocalStorage(task) {
    const oldData = this.getFromLocalStorage();
    const newData = [...oldData];
    newData.push(task);
    localStorage.setItem("taskList", JSON.stringify(newData));
  }

  updateLocalStorage = (task) => {
    const oldArray = this.getFromLocalStorage();
    const elementToChange = oldArray.filter((t) => t.id == task.id)[0];
    elementToChange.position = task.position;
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
