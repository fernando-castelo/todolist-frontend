interface Task {
    id : string;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskCreateDto {
    title: string,
    description : string;
}

export type {Task, TaskCreateDto}