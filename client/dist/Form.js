"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const Service_1 = require("./Service");
const CardCreator_1 = require("./Creator/CardCreator");
class Form {
    constructor() {
        this.form = document.getElementById("form");
        this.cardCreator = new CardCreator_1.CardCreator();
        this.service = new Service_1.Service();
        this.handleInput = (e) => {
            var _a;
            e.preventDefault();
            const header = e.target[0].value;
            const content = e.target[1].value;
            const color = (_a = document.querySelector("input[name='color']:checked")) === null || _a === void 0 ? void 0 : _a.value;
            const newTask = {
                header,
                content,
                color,
            };
            this.addTask(newTask, true);
            const form = document.getElementById("form");
            form.parentElement.classList.toggle("add__container--open");
            form.reset();
        };
    }
    addTask(task, fresh = false) {
        const taskElement = this.cardCreator.createTaskCard(task.header, task.content, task.color, task._id);
        task.position = task.position || 0;
        const properContainer = document.getElementById(task.position);
        properContainer.appendChild(taskElement);
        if (fresh) {
            this.service.addItem(task);
        }
    }
    toggleClass(e) {
        e.target.parentElement.classList.toggle("add__container--open");
    }
    bindEvents() {
        const button = document.getElementById("openButton");
        button.addEventListener("click", this.toggleClass);
        form.addEventListener("submit", this.handleInput);
    }
}
exports.Form = Form;
