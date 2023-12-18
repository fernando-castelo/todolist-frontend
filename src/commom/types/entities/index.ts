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

interface TaskUpdateDto {
    title: string;
    description: string;
    completed: boolean;
}

export type {Task, TaskCreateDto, TaskUpdateDto}