import { TaskService } from "./Service/TaskService";
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
    createContainer() {
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

        if (ev.dataTransfer === null || ev.dataTransfer === undefined) return;

        const id = ev.dataTransfer.getData("text/plain") as string;
        const draggableElement = document.getElementById(id) as HTMLElement;
        const dropzone = ev.target as HTMLElement;
        if (!draggableElement) return;
        this.updateTaskPositionOnDrop(dropzone, draggableElement);
    };

    updateTaskPositionOnDrop(dropzone: HTMLElement, draggableElement: HTMLElement) {
        if (dropzone["classList"].contains("list__container")) {
            const taskObject: TaskEdit = {
                _id: draggableElement.id,
            };
            dropzone.appendChild(draggableElement);
            taskObject.position = dropzone.id as string;
            TaskService.updateItem(taskObject);
        }
    }

    observeTheChange(column: HTMLElement) {
        const target = column;

        const config = { childList: true };

        const callback = (mutationsList: MutationRecord[]) => {
            mutationsList.forEach((mutation: MutationRecord) => {
                if (mutation.type === "childList") {
                    this.updateTheCounter();
                }
            });
        };
        const observer = new MutationObserver(callback);

        observer.observe(target, config);
    }

    getNumberOfTasks(): number {
        const numberOfElements = document
            .getElementById(this.id)
            ?.querySelectorAll(".list__card") as NodeListOf<HTMLElement>;
        if (!numberOfElements) return 0;
        const numberOfElementsInColumn: number = numberOfElements.length;
        return numberOfElementsInColumn;
    }

    updateTheCounter() {
        const counter = document.querySelector(
            `.list--${this.id}  .list__header  .header__counter  .header__number`
        ) as HTMLElement;

        if (counter) {
            const numberOfTasks: number = this.getNumberOfTasks();
            counter.innerHTML = numberOfTasks.toString();
        }
    }
}

export { Container };
