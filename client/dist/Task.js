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
        const editableDiv = element.children[1];
        editableDiv.onblur = () => {
            const service = new Service_1.Service();
            const objToUpdate = {
                id: element.id,
                content: element.children[1].innerHTML,
            };
            service.updateItem(objToUpdate);
        };
    }
    static removeCard(event) {
        event.preventDefault();
        const service = new Service_1.Service();
        const card = event.target.parentElement;
        card.parentElement.removeChild(document.getElementById(card.id));
        service.delateItem(card.id);
    }
}
exports.Task = Task;
