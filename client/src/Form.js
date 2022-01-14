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
const Service_js_1 = require("./Service.js");
const CardCreator_js_1 = require("./Creator/CardCreator.js");
class Form {
    constructor() {
        this.cardCreator = new CardCreator_js_1.CardCreator();
        this.service = new Service_js_1.Service();
        this.bindEvents = () => {
            const button = document.getElementById("openButton");
            const form = document.getElementById("form");
            button === null || button === void 0 ? void 0 : button.addEventListener("click", this.toggleClass);
            form === null || form === void 0 ? void 0 : form.addEventListener("submit", this.handleInput);
        };
    }
    static addTask(task, fresh = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = task._id;
            if (fresh) {
                _id = yield Service_js_1.Service.addItem(task);
            }
            const taskElement = CardCreator_js_1.CardCreator.createTaskCard(task.header, task.content, task.color, _id);
            task.position = task.position || "0";
            const properContainer = document.getElementById(task.position);
            properContainer === null || properContainer === void 0 ? void 0 : properContainer.appendChild(taskElement);
        });
    }
    handleInput(ev) {
        var _a;
        ev.preventDefault();
        const inputElement = ev.target;
        const header = inputElement[0].value;
        const content = inputElement[1].value;
        const color = document.querySelector("input[name='color']:checked").value;
        const _id = "";
        const newTask = {
            header,
            content,
            color,
            _id,
        };
        Form.addTask(newTask, true);
        const form = document.getElementById("form");
        (_a = form === null || form === void 0 ? void 0 : form.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("add__container--open");
        form === null || form === void 0 ? void 0 : form.reset();
    }
    toggleClass() {
        var _a;
        (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("add__container--open");
    }
}
exports.Form = Form;
