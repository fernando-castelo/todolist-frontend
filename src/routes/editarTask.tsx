import { useState } from "react";
import { Task, TaskUpdateDto } from "../commom/types/entities";
import { getTaskById, updateTask } from "../services/taskService";
import { Form, Link, useLoaderData, useNavigate} from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

export async function loader({ params } : {params : any}) {
    const task = await getTaskById(params.taskId);
    return { task };
}

export default function UpdateTask() {
    const { task } = useLoaderData() as { task: Task }
    const navigate = useNavigate();

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const [taskOriginal, setTaskOriginal] = useState(task)

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setTitleError(false)
        setDescriptionError(false)

        if(title == '') {
            setTitleError(true)
        }
    
        if(description == '') {
            setDescriptionError(true)
        }

        if(title && description) {
            const task : TaskUpdateDto = {
                title : title,
                description : description,
                completed: taskOriginal.completed
            }
        
            const createdTask = await updateTask(taskOriginal.id, task)

            navigate('/')
            
        }
    }

    const handleRestaurarPadrao = () => {
        setTitle(taskOriginal.title)
        setDescription(taskOriginal.description)
    }

    return (
        <>
        <h1> {task.title}</h1>
        <form onSubmit={handleSubmit}>
              <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                    required
                    variant='outlined'
                    type='text'
                    sx={{margin: '10px'}}
                    value={title}
                    error={titleError}
                />
                <TextField
                    label="Description"
                    onChange={e => setDescription(e.target.value)}
                    required
                    variant='outlined'
                    type='text'
                    sx={{margin: '10px'}}
                    multiline
                    rows={3}
                    value={description}
                    error={descriptionError}
                />
             </Box>
            
            <Box sx={{display: 'flex'}}>
                <Button sx={{margin: '5%'}} variant="outlined" type="submit">
                    Atualizar Task
                </Button>

                <Button sx={{margin: '5%'}} variant="outlined" onClick={handleRestaurarPadrao}>
                    Restaurar Padrao
                </Button>
            </Box>

            <Button sx={{margin: '5%' , padding: '5%'}} variant="outlined" onClick={() => {navigate('/')}}>
                Retornar Para Tasks
            </Button>
        </form>
        </>
    );
}