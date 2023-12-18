interface Task {
    id : string;
    title: string;
    description: string;
    category: string;
    completed: boolean;
}

interface TaskCreateDto {
    title: string;
    category: string;
    description : string;
}

interface TaskUpdateDto {
    title: string;
    description: string;
    category: string;
    completed: boolean;
}

export type {Task, TaskCreateDto, TaskUpdateDto}