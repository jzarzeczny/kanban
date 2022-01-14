"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const Service_js_1 = require("./Service.js");
class Task {
    static onDragStart(ev) {
        var _a;
        const element = ev.target;
        (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", element.id);
    }
    static editCard(event) {
        const eventElement = event.target;
        let id = "";
        if (eventElement.parentElement) {
            id = eventElement.parentElement.id;
        }
        const element = document.getElementById(id);
        const editableDiv = element === null || element === void 0 ? void 0 : element.children[1];
        editableDiv.onblur = () => {
            const objToUpdate = {
                id: element.id,
                content: element === null || element === void 0 ? void 0 : element.children[1].innerHTML,
            };
            Service_js_1.Service.updateItem(objToUpdate);
        };
    }
    static removeCard(event) {
        var _a;
        event.preventDefault();
        const target = event.target;
        const card = target.parentElement;
        (_a = card === null || card === void 0 ? void 0 : card.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(document.getElementById(card.id));
        Service_js_1.Service.delateItem(card.id);
    }
}
exports.Task = Task;
