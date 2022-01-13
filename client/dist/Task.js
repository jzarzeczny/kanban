"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const Service_1 = require("./Service");
class Task {
    static onDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
    }
    static editCard(event) {
        event.preventDefault();
        const elementID = event.target.parentElement.id;
        const element = document.getElementById(elementID);
        const editableDiv = element === null || element === void 0 ? void 0 : element.children[1];
        editableDiv.onblurs = () => {
            const service = new Service_1.Service();
            const objToUpdate = {
                id: element === null || element === void 0 ? void 0 : element.id,
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
