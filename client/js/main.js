import Storage from "./Storage.js";
import Form from "./Form.js";
import Creator from "./Creator.js";

class Main {
   root = document.getElementById("root");

   store = new Storage();
   form = new Form();
   creator = new Creator();

   run() {
      this.creator.createForm(root);
      this.creator.createContainer(0, "todo");
      this.creator.createContainer(1, "going");
      this.creator.createContainer(2, "done");
      const button = document.getElementById("openButton");
      this.form.bindEvent();
      button.addEventListener("click", this.form.toggleClass);
      const tasksArray = this.store.getFromLocalStorage();
      tasksArray.forEach((task) => this.form.addTask(task));
   }
}
export default Main;
