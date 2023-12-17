import { Task, TaskCreateDto } from "../commom/types/entities";

const API_URL = 'http://localhost:8080/tasks/';

const createTask = async (createTaskDto: TaskCreateDto) : Promise<Task> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createTaskDto)
    })

    if(response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    

}

export {createTask}