import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, FormLabel } from '@mui/material';
import { useState } from 'react';
import { Task, TaskCreateDto } from '../../commom/types/entities';
import { createTask } from '../../services/taskService';

export default function CreateTaskForm({ onTaskSubmitted, handleClose }: { onTaskSubmitted: (task: Task) => void, handleClose: () => void}) {

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");

const [titleError, setTitleError] = useState(false);
const [descriptionError, setDescriptionError] = useState(false);
const [categoryError, setCategoryError] = useState(false);

const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let task: TaskCreateDto

    setTitleError(false)
    setDescriptionError(false)
    setCategoryError(false)

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
        const task : TaskCreateDto = {
            title : title,
            description : description,
            category: category
        }
    
        const createdTask = await createTask(task)

        onTaskSubmitted(createdTask)

        setTitle('');
        setDescription('');
        setCategory('')

        handleClose()
    }
  
}

return (
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
    </Box>

    <Button sx={{marginLeft: '38%'}} variant="outlined" type="submit">
        Criar Task
    </Button>

    </form>
)
}