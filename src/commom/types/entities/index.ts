interface Task {
    id : string;
    title: string;
    description: string;
    completed: boolean;
    randomField: string;
}

interface TaskCreateDto {
    title: string,
    description : string;
    completed: boolean
}