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
        function dataNotNull(ev: DragEvent) {
            if (ev.dataTransfer) {
                return ev.dataTransfer.getData("text/plain") as string;
            }
            return "";
        }
        const id = dataNotNull(ev);
        const draggableElement = document.getElementById(id) as any; //What type should be here?!
        const dropzone = ev.target as HTMLElement;

        if (dropzone["classList"].contains("list__container")) {
            dropzone.appendChild(draggableElement);
            // Update the position of element in array
            draggableElement.position = dropzone.id;
            Service.updateItem(draggableElement);
        }
    };
}

export { Container };
