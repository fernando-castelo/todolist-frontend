import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import { TaskCreateDto } from '../../commom/types/entities';
import { createTask } from '../../services/taskService';

export default function CreateUpdateTaskForm() {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const [titleError, setTitleError] = useState(false);
const [descriptionError, setDescriptionError] = useState(false);

const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
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
        console.log("ok")
    }

    const task : TaskCreateDto = {
        title : title,
        description : description
    }

    const response = createTask(task)

    console.log(response)
  
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
            value={description}
            error={descriptionError}
        />

        <Button variant="outlined" type="submit">Criar Task</Button>
    </form>
)
}