"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const Service_js_1 = require("./Service.js");
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
    ev.preventDefault();
    function dataNotNull(ev) {
        if (ev.dataTransfer) {
            return ev.dataTransfer.getData("text/plain");
        }
        return "";
    }
    const id = dataNotNull(ev);
    const draggableElement = document.getElementById(id);
    const dropzone = ev.target;
    if (dropzone["classList"].contains("list__container")) {
        dropzone.appendChild(draggableElement);
        // Update the position of element in array
        draggableElement.position = dropzone.id;
        Service_js_1.Service.updateItem(draggableElement);
    }
};
