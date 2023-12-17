import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import { Task, TaskCreateDto } from '../../commom/types/entities';
import { createTask } from '../../services/taskService';

export default function CreateUpdateTaskForm({ onTaskSubmitted, handleClose }: { onTaskSubmitted: (task: Task) => void, handleClose: () => void}) {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const [titleError, setTitleError] = useState(false);
const [descriptionError, setDescriptionError] = useState(false);

const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let task: TaskCreateDto

    setTitleError(false)
    setDescriptionError(false)

    if(title == '') {
        setTitleError(true)
    }

    if(description == '') {
        setDescriptionError(true)
    }

    if(title && description) {
        const task : TaskCreateDto = {
            title : title,
            description : description
        }
    
        const createdTask = await createTask(task)

        onTaskSubmitted(createdTask)

        setTitle('');
        setDescription('');

        handleClose()
    }
  
}

return (
    <form onSubmit={handleSubmit}>
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

        <Button variant="outlined" type="submit">Criar Task</Button>
    </form>
)
}