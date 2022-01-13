"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const Service_1 = require("./Service");
class Task {
    static onDragStart(ev) {
        var _a;
        const element = ev.target;
        (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", element.id);
    }
    static editCard(event) {
        var _a;
        const eventElement = event.target;
        const id = (_a = eventElement.parentElement) === null || _a === void 0 ? void 0 : _a.id;
        const element = document.getElementById(id);
        const editableDiv = element === null || element === void 0 ? void 0 : element.children[1];
        editableDiv.onblur = () => {
            const service = new Service_1.Service();
            const objToUpdate = {
                _id: element.id,
                content: element === null || element === void 0 ? void 0 : element.children[1].innerHTML,
            };
            service.updateItem(objToUpdate);
        };
    }
    static removeCard(event) {
        var _a;
        event.preventDefault();
        const service = new Service_1.Service();
        const target = event.target;
        const card = target.parentElement;
        (_a = card === null || card === void 0 ? void 0 : card.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(document.getElementById(card.id));
        service.delateItem(card.id);
    }
}
exports.Task = Task;
