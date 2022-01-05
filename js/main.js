import Task from "./Task.js";
import Container from "./Container.js";
import Storage from "./Storage.js";
import Form from "./Form.js";

class Main {
   root = document.getElementById("root");

   c0 = new Container(0, "todo", this.updateThePositionOfTask);
   c1 = new Container(1, "going", this.updateThePositionOfTask);
   c2 = new Container(2, "done", this.updateThePositionOfTask);
   store = new Storage();
   form = new Form();
   addTheContainers() {
      this.root.appendChild(this.c0.createWholeContainer());
      this.root.appendChild(this.c1.createWholeContainer());
      this.root.appendChild(this.c2.createWholeContainer());
   }

   updateThePositionOfTask(task, position) {
      // TODO del the task -> those operation happen in storage
      task.position = position;
      const store = new Storage();
      store.updateLocalStorage(task);
   }

   run() {
      this.addTheContainers();
      this.form.bindEvent();
      const tasksArray = this.store.getFromLocalStorage();
      tasksArray.forEach((task) => this.form.addTask(task));
   }
}

const container = new Main();
container.run();
