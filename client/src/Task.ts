import { TaskCreator } from "./Creator/TaskCreator";
import { TaskService } from "./Service/TaskService";
import { TaskEdit, TaskObject, TaskInfo } from "./validators/taskValidators";
import { CardInfoCreator } from "./Creator/TaskInfoCreator";

class Task {
    header: string;
    content: string;
    color: string;
    author: string;
    position: string;
    _id: string;
    editList: TaskInfo[];
    currentUser: string;
    constructor(taskData: TaskObject, currentUser: string) {
        this.header = taskData.header;
        this.content = taskData.content;
        this.color = taskData.color;
        this.author = taskData.author;
        this.position = taskData.position || "0";
        this._id = taskData._id || "";
        this.editList = taskData.editList;
        this.currentUser = currentUser;
    }

    taskCreator = new TaskCreator();

    async addTask(fresh: boolean = false): Promise<void> {
        const taskObject = this.createTaskObject();
        if (fresh) {
            const newId = await TaskService.addItem(taskObject);
            this._id = newId;
            taskObject._id = newId;
        }
        const taskElement: HTMLElement = this.createTaskElement();

        this.addTaskToContainer(taskElement);
    }

    private createTaskObject(): TaskObject {
        const taskObject = {
            header: this.header,
            content: this.content,
            color: this.color,
            author: this.author,
            _id: this._id,
            editList: this.editList,
        };
        return taskObject;
    }

    private createTaskElement(): HTMLElement {
        const cardContainer = this.taskCreator.createTaskContainer(this.color, this._id);
        cardContainer.addEventListener("dragstart", this.onDragStart);

        const cardHeader = this.taskCreator.createTaskHeader(this.header);
        const cardContent = this.taskCreator.createTaskContent(this.content);
        cardContent.addEventListener("click", this.editTask);
        const cardButton = this.taskCreator.createTaskButton();
        cardButton.addEventListener("click", this.removeTask);

        const cardInfo = this.taskCreator.createTaskInfo();
        cardInfo.addEventListener("mouseover", this.showTaskInfo);
        cardInfo.addEventListener("mouseout", this.removeTaskInfo);

        const cardAuthor = this.taskCreator.createTaskAuthor(this.author);

        cardContainer.appendChild(cardHeader);
        cardContainer.appendChild(cardContent);
        cardContainer.appendChild(cardAuthor);
        cardContainer.appendChild(cardButton);
        cardContainer.appendChild(cardInfo);

        return cardContainer;
    }

    private addTaskToContainer(taskElement: HTMLElement) {
        const properContainer = document.getElementById(this.position) as HTMLElement;
        if (properContainer) {
            properContainer.appendChild(taskElement);
        }
    }

    private onDragStart(ev: DragEvent) {
        const element = ev.target as HTMLElement;
        ev.dataTransfer?.setData("text/plain", element.id);
    }

    editTask = () => {
        const editableDiv = this.getEditableDiv();
        editableDiv.addEventListener("blur", this.onBlurHandler);
    };

    removeTask = (event: Event) => {
        event.preventDefault();
        this.taskCreator.removeTask(this._id);
        TaskService.deleteItem(this._id);
    };

    private showTaskInfo = (event: MouseEvent): void => {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        if (taskId && this.editList.length > 0) {
            CardInfoCreator.createTaskInfo(taskId);
            this.editList.forEach((singleEditInformation: TaskInfo) => {
                CardInfoCreator.createTaskSingleInfo(taskId, singleEditInformation);
            });
        }
    };
    private removeTaskInfo(event: MouseEvent): void {
        const taskId: string = (event.relatedTarget as HTMLElement).id;
        if (taskId) {
            CardInfoCreator.removeTaskInfo(taskId);
        }
    }

    private onBlurHandler = () => {
        const editableDiv = this.getEditableDiv();
        const newContent = editableDiv.innerHTML;
        const newEditList = [
            ...this.editList,
            {
                author: this.currentUser,
                change: newContent,
                time: Date.now(),
            },
        ];
        const taskObject: TaskEdit = {
            _id: this._id,
            content: newContent,
            editList: newEditList,
        };
        this.editList = newEditList;
        TaskService.updateItem(taskObject);

        // Add the function that change the location of info based on the location of mouse or task
    };

    set editListOfTask(editList: TaskInfo[]) {
        this.editList = editList;
    }

    private getEditableDiv(): HTMLElement {
        const taskElement = document.getElementById(this._id);
        const editableDiv = taskElement?.children[1] as HTMLElement;
        return editableDiv;
    }
}

export { Task };
