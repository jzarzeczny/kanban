import Task from "./Task.js";
import Container from "./Container.js";
import Storage from "./Storage.js";

const form = document.getElementById("form");

class Main {
  root = document.getElementById("root");

  c0 = new Container(0, "todo", this.updateThePositionOfTask);
  c1 = new Container(1, "going", this.updateThePositionOfTask);
  c2 = new Container(2, "done", this.updateThePositionOfTask);
  store = new Storage();

  addTheContainers() {
    this.root.appendChild(this.c0.createWholeContainer());
    this.root.appendChild(this.c1.createWholeContainer());
    this.root.appendChild(this.c2.createWholeContainer());
  }
  addTask(task, fresh = false) {
    const taskObj = new Task(
      task.header,
      task.content,
      task.color,
      task.id,
      task.position
    );
    const taskElement = taskObj.createTaskCard();
    const properContainer = document.getElementById(task.position);
    properContainer.appendChild(taskElement);

    if (fresh) {
      this.store.addToLocalStorage(task);
    }
  }

  updateThePositionOfTask(task, position) {
    task.position = position;
    const store = new Storage();
    store.updateLocalStorage(task);
  }

  run() {
    this.addTheContainers();
    const tasksArray = this.store.getFromLocalStorage();
    console.log(tasksArray);
    tasksArray.forEach((task) => this.addTask(task));
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const header = e.target[0].value;
  const content = e.target[1].value;
  const color = e.target[2].value;
  const id = Date.now() + Math.random();
  const newTask = new Task(header, content, color, id);
  container.addTask(newTask, true);

  form.reset();
});

const container = new Main();
container.run();
