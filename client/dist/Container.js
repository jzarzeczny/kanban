import { Service } from "./Service.js";
class Container {
    constructor(id, header) {
        this.id = id;
        this.header = header;
    }
    static onDragOver(event) {
        event.preventDefault();
    }
}
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
        draggableElement.position = dropzone.id;
        Service.updateItem(draggableElement);
    }
};
export { Container };
