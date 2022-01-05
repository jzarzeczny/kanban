import Task from "./Task.js";
import Storage from "./Storage.js";
class Form {
   form = document.getElementById("form");
   button = document.getElementById("openButton");

   store = new Storage();

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

   handleInput(e) {
      e.preventDefault();
      const header = e.target[0].value;
      const content = e.target[1].value;
      const color = e.target[2].value;
      const id = Date.now() + Math.random();
      const newTask = new Task(header, content, color, id);
      this.addTask(newTask, true);

      form.reset();
   }
   toggleClass(e) {
      console.log("toggling!");
      e.target.classList.toggle("add__open--open");
   }

   bindEvent() {
      form.addEventListener("submit", this.handleInput);
      this.button.addEventListener("onClick", this.toggleClass);
   }
}

export default Form;
