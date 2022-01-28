import { CardCreator } from "./Creator/CardCreator";
import { TaskService } from "./Service/TaskService";
import { TaskEdit, TaskObject, TaskInfo } from "./validators/taskValidators";
import { CardInfoCreator } from "./Creator/CardInfoCreator";

class Task {
    header: string;
    content: string;
    color: string;
    position: string;
    _id: string;
    editList: TaskInfo[];
    constructor(taskData: TaskObject) {
        this.header = taskData.header;
        this.content = taskData.content;
        this.color = taskData.color;
        this.position = taskData.position || "0";
        this._id = taskData._id || "";
        this.editList = taskData.editList;
    }

    cardCreator = new CardCreator();

    onDragStart(ev: DragEvent) {
        const element = ev.target as HTMLElement;
        ev.dataTransfer?.setData("text/plain", element.id);
    }

    editTask(event: Event) {
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
    async addTask(fresh: boolean = false): Promise<void> {
        const taskObject = this.createTaskObject();
        if (fresh) {
            const newId = await TaskService.addItem(taskObject);
            this._id = newId;
            taskObject._id = newId;
        }
        const taskElement: HTMLElement = this.createTaskElement();

        const properContainer = document.getElementById(this.position) as HTMLElement;
        if (properContainer) {
            properContainer.appendChild(taskElement);
        }
    }
    createTaskObject(): TaskObject {
        const taskObject = {
            header: this.header,
            content: this.content,
            color: this.color,
            _id: this._id,
            editList: this.editList,
        };
        return taskObject;
    }

    createTaskElement(): HTMLElement {
        const cardContainer = this.cardCreator.createCardContainer(this.color, this._id);
        cardContainer.addEventListener("dragstart", this.onDragStart);

        const cardHeader = this.cardCreator.createCardHeader(this.header);
        const cardContent = this.cardCreator.createCardContent(this.content);
        cardContent.addEventListener("click", this.editTask);
        const cardButton = this.cardCreator.createCardButton();
        cardButton.addEventListener("click", this.removeTask);

        const cardInfo = this.cardCreator.createCardInfo();
        cardInfo.addEventListener("mouseover", this.showTaskInfo);
        cardInfo.addEventListener("mouseout", this.removeTaskInfo);

        cardContainer.appendChild(cardHeader);
        cardContainer.appendChild(cardContent);
        cardContainer.appendChild(cardButton);
        cardContainer.appendChild(cardInfo);

        // Add the card to TODO section
        return cardContainer;
    }

    set editListOfTask(editList: TaskInfo[]) {
        this.editList = editList;
    }

    removeTask(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const card = target.parentElement as HTMLElement;
        card?.parentElement?.removeChild(document.getElementById(card.id) as HTMLElement);
        TaskService.deleteItem(card.id);
    }

    showTaskInfo = (event: MouseEvent): void => {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        CardInfoCreator.createTaskInfo(taskId);
        this.editList.forEach((singleEditInformation: TaskInfo) => {
            CardInfoCreator.createTaskSingleInfo(taskId, singleEditInformation);
        });
    };
    removeTaskInfo(event: MouseEvent): void {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        CardInfoCreator.removeTaskInfo(taskId);
    }
}

export { Task };
