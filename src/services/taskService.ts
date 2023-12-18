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

const getTaskById = async (taskId : String) : Promise<Task> => {
    const response = await fetch(`${API_URL}${taskId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })

    if(response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        return responseData;
    } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
}

export {createTask, getTaskById}