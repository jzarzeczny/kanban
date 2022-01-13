import { Service } from "./Service.js";

class Container {
    id: string;
    header: string;
    constructor(id: string, header: string) {
        this.id = id;
        this.header = header;
    }

    static onDragOver(event: Event) {
        event.preventDefault();
    }

    static onDrop = (ev: DragEvent) => {
        ev.preventDefault();
        const dataTransfer = ev.dataTransfer as DataTransfer;
        const id: string = dataTransfer.getData("text/plain");
        const draggableElement = document.getElementById(id) as any;
        const dropzone = ev.target as HTMLElement;

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
