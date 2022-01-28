interface Task {
    header: string;
    content: string;
    color: string;
    author: string;
    position: number;
    editList: TaskHistory[];
}

interface TaskHistory {
    author: string;
    change: string;
    time: number;
}

export { Task };
