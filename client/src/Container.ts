import { Service } from "./Service.js";
import { TaskEdit } from "./validators/taskValidators";

class Container {
    id: string;
    header: string;
    constructor(id: string, header: string) {
        this.id = id;
        this.header = header;
    }

    static onDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    static onDrop = (ev: DragEvent): void => {
        ev.preventDefault();
        function dataNotNull(ev: DragEvent): string {
            if (ev.dataTransfer) {
                return ev.dataTransfer.getData("text/plain") as string;
            }
            return "";
        }
        const id = dataNotNull(ev);
        const draggableElement = document.getElementById(id) as HTMLElement;
        const dropzone = ev.target as HTMLElement;

        const updateObject: TaskEdit = {
            id: draggableElement.id,
        };
        if (dropzone["classList"].contains("list__container")) {
            dropzone.appendChild(draggableElement);
            // Update the position of element in array
            updateObject.position = dropzone.id;
            Service.updateItem(updateObject);
        }
    };
}

export { Container };
