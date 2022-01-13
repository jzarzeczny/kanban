import { Service } from "./Service";

class Container {
    id?: string;
    header?: string;
    constructor(id: string, header: string) {
        this.id = id;
        this.header = header;
    }

    static onDragOver(event: Event) {
        event.preventDefault();
    }

    static onDrop = (ev: DragEvent) => {
        ev.preventDefault();
        const id = ev.dataTransfer?.getData("text/plain");
        const draggableElement = document?.getElementById(id);
        const dropzone = ev.target;

        if (dropzone["classList"].contains("list__container")) {
            dropzone.appendChild(draggableElement);
            // Update the position of element in array
            draggableElement.position = dropzone.id;
            const service = new Service();
            service.updateItem(draggableElement);
        }
    };
}

export { Container };
