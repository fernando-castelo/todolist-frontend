import { TaskCreateDto } from "../commom/types/entities";

const API_URL = 'http://localhost:8080/tasks/';

const createTask = async (createTaskDto: TaskCreateDto) : Promise<Response> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createTaskDto)
    })

    return response;
}

export {createTask}