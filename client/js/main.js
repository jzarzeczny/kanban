import Storage from "./Storage.js";
import Form from "./Form.js";
import FormCreator from "./Creator/FormCreator.js";
import ContainerCreator from "./Creator/ContainerCreator.js";
class Main {
   root = document.getElementById("root");

   store = new Storage();
   form = new Form();
   formCreator = new FormCreator();
   containerCreator = new ContainerCreator();

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
   async run() {
      this.root.innerHTML = "";
      this.formCreator.createForm(root);
      this.columns.forEach((column) => {
         this.containerCreator.createContainer(column.id, column.name);
      });
      this.form.bindEvents();
      const tasksArray = await this.store.getData();
      tasksArray.forEach((task) => this.form.addTask(task));
   }
}
export default Main;
