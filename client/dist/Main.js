"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const Service_js_1 = require("./Service.js");
const Form_js_1 = require("./Form.js");
const FormCreator_1 = require("./Creator/FormCreator");
const ContainerCreator_1 = require("./Creator/ContainerCreator");
class Main {
    constructor() {
        this.root = document.getElementById("root");
        this.service = new Service_js_1.Service();
        this.form = new Form_js_1.Form();
        this.formCreator = new FormCreator_1.FormCreator();
        this.containerCreator = new ContainerCreator_1.ContainerCreator();
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
exports.Main = Main;
