import { CardCreator } from "./Creator/CardCreator";
import { TaskService } from "./Service/TaskService";
import { TaskEdit, TaskObject, TaskInfo } from "./validators/taskValidators";
import { CardInfoCreator } from "./Creator/CardInfoCreator";

class Task {
    static editList: TaskInfo[] = [];

    static onDragStart(ev: DragEvent) {
        const element = ev.target as HTMLElement;
        ev.dataTransfer?.setData("text/plain", element.id);
    }

    static editTask(event: Event) {
        const eventElement = event.target as HTMLElement;
        let id: string = "";
        if (eventElement.parentElement) {
            id = eventElement.parentElement.id;
        }
        const element = document.getElementById(id) as HTMLElement;
        const editableDiv = element.children[1] as HTMLElement;
        editableDiv.onblur = (): void => {
            const taskObject: TaskEdit = {
                id: element.id,
                content: element?.children[1].innerHTML,
            };
            TaskService.updateItem(taskObject);
        };
    }
    static async addTask(task: TaskObject, fresh: boolean = false): Promise<void> {
        let _id: string = task._id;
        if (fresh) {
            _id = await TaskService.addItem(task);
        }
        const taskElement: HTMLElement = CardCreator.createTaskCard(
            task.header,
            task.content,
            task.color,
            _id
        );

        this.editListOfTask = task.editList;

        task.position = task.position || "0";
        const properContainer = document.getElementById(task.position) as HTMLElement;
        if (properContainer) {
            properContainer.appendChild(taskElement);
        }
    }

    static set editListOfTask(editList: TaskInfo[]) {
        this.editList = editList;
    }

    static removeTask(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const card = target.parentElement as HTMLElement;
        card?.parentElement?.removeChild(document.getElementById(card.id) as HTMLElement);
        TaskService.deleteItem(card.id);
    }

    static showTaskInfo = (event: MouseEvent): void => {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        CardInfoCreator.createTaskInfo(taskId);
        this.editList.forEach((singleEditInformation: TaskInfo) => {
            CardInfoCreator.createTaskSingleInfo(taskId, singleEditInformation);
        });
    };
    static removeTaskInfo(event: MouseEvent): void {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        CardInfoCreator.removeTaskInfo(taskId);
    }
}

export { Task };
