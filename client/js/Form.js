import Task from "./Task.js";
import Storage from "./Storage.js";
import Creator from "./Creator.js";
class Form {
   form = document.getElementById("form");

   creator = new Creator();

   store = new Storage();

   addTask(task, fresh = false) {
      const taskElement = this.creator.createTaskCard(
         task.header,
         task.content,
         task.color,
         task.id
      );
      task.position = task.position || 0;
      const properContainer = document.getElementById(task.position);
      properContainer.appendChild(taskElement);

      if (fresh) {
         this.store.addToLocalStorage(task);
      }
   }

   handleInput = (e) => {
      e.preventDefault();
      const header = e.target[0].value;
      const content = e.target[1].value;
      const color = document.querySelector("input[name='color']:checked").value;
      const id = Date.now() + Math.random();
      const newTask = {
         header,
         content,
         color,
         id,
      };
      this.addTask(newTask, true);
      const form = document.getElementById("form");

      form.parentElement.classList.toggle("add__container--open");
      form.reset();
   };
   toggleClass(e) {
      e.target.parentElement.classList.toggle("add__container--open");
   }

   bindEvent() {
      form.addEventListener("submit", this.handleInput);
   }
}

export default Form;
