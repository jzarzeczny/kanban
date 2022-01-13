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
            const color = document.querySelector("input[name='color']:checked").value;
            const _id = "";
            const newTask = {
                header,
                content,
                color,
                _id,
            };
            this.addTask(newTask, true);
            const form = document.getElementById("form");
            (_a = form === null || form === void 0 ? void 0 : form.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("add__container--open");
            form === null || form === void 0 ? void 0 : form.reset();
        };
    }
    addTask(task, fresh = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = task._id;
            if (fresh) {
                return (_id = yield this.service.addItem(task));
            }
            const taskElement = this.cardCreator.createTaskCard(task.header, task.content, task.color, _id);
            task.position = task.position || "0";
            const properContainer = document.getElementById(task.position);
            properContainer === null || properContainer === void 0 ? void 0 : properContainer.appendChild(taskElement);
        });
    }
    toggleClass(e) {
        e.target.parentElement.classList.toggle("add__container--open");
    }
    bindEvents() {
        var _a;
        const button = document.getElementById("openButton");
        button === null || button === void 0 ? void 0 : button.addEventListener("click", this.toggleClass);
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", this.handleInput);
    }
}
exports.Form = Form;
