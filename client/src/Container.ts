import { Service } from "./Service";
import { TaskEdit } from "./validators/taskValidators";
import { ContainerCreator } from "./Creator/ContainerCreator";

class Container {
    id: string;
    header: string;
    creator: Function;
    constructor(id: string, header: string) {
        this.id = id;
        this.header = header;
        this.creator = ContainerCreator.createContainer;
    }
    create() {
        this.creator(this.id, this.header);
        const column = document.getElementById(this.id) as HTMLElement;

        column.addEventListener("dragover", this.onDragOver);
        column.addEventListener("drop", this.onDrop);
        this.observeTheChange(column);
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    onDrop = (ev: DragEvent): void => {
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

    observeTheChange(column: HTMLElement) {
        const target = column;

        const config = { childList: true };

        const callback = (mutationsList: any) => {
            mutationsList.forEach((mutation: any) => {
                if (mutation.type === "childList") {
                    this.updateTheCounter(column);
                }
            });
        };
        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    }

    getNumberOfTasks(column: HTMLElement): number {
        const dndZone = column as HTMLElement;
        const numberOfElementsInColumn: number = dndZone.childNodes.length;
        return numberOfElementsInColumn;
    }

    updateTheCounter(column: HTMLElement) {
        const counter = (column as HTMLElement).parentElement?.childNodes[0].childNodes[1]
            .childNodes[0] as HTMLElement;

        if (counter) {
            const numberOfTasks: number = this.getNumberOfTasks(column);
            counter.innerHTML = numberOfTasks.toString();
        }
    }
}

export { Container };
