interface NewTaskObject {
    header: string;
    content: string;
    color: string;
    author: string;
    position?: string;
}

interface TaskObject extends NewTaskObject {
    _id: string;
    editList: TaskInfo[];
}

interface TaskEdit {
    _id: string;
    content?: string;
    position?: string;
    editList?: TaskInfo[];
}

interface TaskInfo {
    author: string;
    change: string;
    time: number;
}

export { TaskObject, NewTaskObject, TaskEdit, TaskInfo };
