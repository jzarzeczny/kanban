import Storage from "./Storage.js";
import Form from "./Form.js";
import Creator from "./Creator.js";

class Main {
   root = document.getElementById("root");

   store = new Storage();
   form = new Form();
   creator = new Creator();

   columns = [
      {
         id: 0,
         name: "todo",
      },
      {
         id: 1,
         name: "going",
      },
      {
         id: 2,
         name: "done",
      },
   ];
   bindEvents() {
      this.form.bindEvent();
   }
   run() {
      this.creator.createForm(root);
      this.columns.forEach((column) => {
         this.creator.createContainer(column.id, column.name);
      });
      this.bindEvents();
      const tasksArray = this.store.getFromLocalStorage();
      tasksArray.forEach((task) => this.form.addTask(task));
   }
}
export default Main;
