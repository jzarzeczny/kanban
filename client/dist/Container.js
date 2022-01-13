"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const Service_1 = require("./Service");
class Container {
    constructor(id, header) {
        this.id = id;
        this.header = header;
    }
    static onDragOver(event) {
        event.preventDefault();
    }
}
exports.Container = Container;
Container.onDrop = (ev) => {
    var _a;
    ev.preventDefault();
    const id = (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
    const draggableElement = document === null || document === void 0 ? void 0 : document.getElementById(id);
    const dropzone = ev.target;
    if (dropzone["classList"].contains("list__container")) {
        dropzone.appendChild(draggableElement);
        // Update the position of element in array
        draggableElement.position = dropzone.id;
        const service = new Service_1.Service();
        service.updateItem(draggableElement);
    }
};
