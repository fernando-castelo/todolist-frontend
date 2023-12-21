import { Task, TaskCreateDto, TaskUpdateDto } from "../commom/types/entities";

const API_URL = 'http://localhost:8080/tasks/';

const getCompletedTasks = async () : Promise<Task[]> => {
    const status = 'completed'
    
    const response = await fetch(`${API_URL}?status=${status}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
    })

    const data = await response.json();

    return data;

  }


 const getUncompletedTasks = async () : Promise<Task[]> => {
    const status = 'uncompleted'
    
    const response = await fetch(`${API_URL}?status=${status}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
    })

    const data = await response.json();

    return data;

  }

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
        return responseData;
    } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
}

const updateTask = async (taskId : String, taskUpdateDto : TaskUpdateDto) : Promise<Task> => {
    const response = await fetch(`${API_URL}${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskUpdateDto)
    })

    if(response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
}

const deleteTask = async (taskId : String) : Promise<Response> => {
    const response = await fetch(`${API_URL}${taskId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        return response;
    } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
}

export {getCompletedTasks, getUncompletedTasks, createTask, getTaskById, updateTask, deleteTask}