var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Service } from "./Service.js";
import { Form } from "./Form.js";
import { FormCreator } from "./Creator/FormCreator";
import { ContainerCreator } from "./Creator/ContainerCreator";
class Main {
    constructor() {
        this.root = document.getElementById("root");
        this.service = new Service();
        this.form = new Form();
        this.formCreator = new FormCreator();
        this.containerCreator = new ContainerCreator();
        this.columns = [
            {
                id: "0",
                name: "todo",
            },
            {
                id: "1",
                name: "going",
            },
            {
                id: "2",
                name: "done",
            },
        ];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.root.innerHTML = "";
            this.formCreator.createForm(this.root);
            this.columns.forEach((column) => {
                this.containerCreator.createContainer(column.id, column.name);
            });
            this.form.bindEvents();
            const tasksArray = yield this.service.getData();
            tasksArray.forEach((task) => this.form.addTask(task));
        });
    }
}
export { Main };
