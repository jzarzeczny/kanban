import Task from "./Task.js";
import Container from "./Container.js";

const form = document.getElementById("form");

class Main {
  root = document.getElementById("root");
  c0 = new Container(0, "todo");
  c1 = new Container(1, "going");
  c2 = new Container(2, "done");
  tasksArray = [];
  containers = [this.c0, this.c1, this.c2];

  addTheContainers() {
    this.root.appendChild(this.c0.createWholeContainer());
    this.root.appendChild(this.c1.createWholeContainer());
    this.root.appendChild(this.c2.createWholeContainer());
  }
  addTask(task) {
    const taskElement = task.createTaskCard();
    const properContainer = document.getElementById(task.position);
    properContainer.appendChild(taskElement);

    this.tasksArray.push(task);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    console.log(this.tasksArray);
    localStorage.setItem("taskList", JSON.stringify(this.tasksArray));
  }

  getFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("taskList"));
    data.forEach((task) => {
      const taskObj = new Task(
        task.header,
        task.content,
        task.color,
        task.id,
        task.position
      );
      this.addTask(taskObj);
    });
    return data;
  }
  run() {
    this.addTheContainers();
    this.tasksArray = this.getFromLocalStorage();
    // this.getFromLocalStorage();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const header = e.target[0].value;
  const content = e.target[1].value;
  const color = e.target[2].value;
  const id = Date.now() + Math.random();
  const newTask = new Task(header, content, color, id);
  container.addTask(newTask);

  form.reset();
});

const container = new Main();
container.run();

// const newTask1 = new Task("dsf", "lorem ipsum", "#aa4", 45);
// const newTask2 = new Task("fsd", "lorem ipsum", "#ac3", 456456, 1);
// const newTask3 = new Task("gdfgfd", "lorem ipsum", "#ab1", 124234234, 2);
// container.addTask(newTask1);
// container.addTask(newTask2);
// container.addTask(newTask3);
