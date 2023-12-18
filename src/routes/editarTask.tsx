import { useState } from "react";
import { Task, TaskUpdateDto } from "../commom/types/entities";
import { getTaskById, updateTask } from "../services/taskService";
import { Form, Link, useLoaderData, useNavigate} from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';


export async function loader({ params } : {params : any}) {
    const task = await getTaskById(params.taskId);
    return { task };
}

export default function UpdateTask() {
    const { task } = useLoaderData() as { task: Task }
    const navigate = useNavigate();

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [category, setCategory] = useState(task.category);
    const [completed, setCompleted] = useState(task.completed);

    const [taskOriginal, setTaskOriginal] = useState(task)

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

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

        if(category == '') {
            setCategoryError(true)
        }

        if(title && description && category) {
            const task : TaskUpdateDto = {
                title : title,
                description : description,
                completed: completed,
                category: category
            }
        
            const createdTask = await updateTask(taskOriginal.id, task)

            navigate('/')
            
        }
    }

    const handleRestaurarPadrao = () => {
        setTitle(taskOriginal.title)
        setDescription(taskOriginal.description)
        setCompleted(taskOriginal.completed)
        setCategory(taskOriginal.category)
    }

    const handleCheckboxChange = () => {
        setCompleted(!completed)
        console.log(completed)
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
                <TextField
                    label="Category"
                    onChange={e => setCategory(e.target.value)}
                    required
                    variant='outlined'
                    type='text'
                    sx={{margin: '10px'}}
                    value={category}
                    error={categoryError}
                />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h5">Atividade Concluida</Typography>
                    <Switch sx={{margin: '5px', marginLeft: '40%'}} checked={completed} onChange={handleCheckboxChange}/>
                </Box>
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