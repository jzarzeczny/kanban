import { Service } from "./Service";
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
    const dataTransfer = ev.dataTransfer;
    const id = dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(id);
    const dropzone = ev.target;
    if (dropzone["classList"].contains("list__container")) {
        dropzone.appendChild(draggableElement);
        // Update the position of element in array
        draggableElement.position = dropzone.id;
        const service = new Service();
        service.updateItem(draggableElement);
    }
};
export { Container };
