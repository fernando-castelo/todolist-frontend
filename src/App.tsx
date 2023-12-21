import { useEffect, useState } from 'react'
import './App.css'
import { Card, CardContent, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Task } from './commom/types/entities';
import ListTasks from './components/ListTasks';
import CreateTaskForm from './components/CreateTaskForm';
import { getCompletedTasks, getUncompletedTasks } from './services/taskService';

function App() {

  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [uncompletedTasks, setUncompletedTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  }

  const handleGetCompletedTasks = async () => {
    
    const tasks = await getCompletedTasks()

    setCompletedTasks(tasks)

  }


 const handleGetUncompletedTasks = async () => {
    
    const tasks = await getUncompletedTasks()

    setUncompletedTasks(tasks)

  }

  useEffect(() => {
    handleGetCompletedTasks()
    handleGetUncompletedTasks()
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskSubmitted = (newTask: Task) => {
    setUncompletedTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTasks = (taskStatus : boolean, tasks : Task[]) => {

    taskStatus ? setCompletedTasks(tasks) : setUncompletedTasks(tasks)
  }


  return (
    <>  
    <Typography variant="h1">Tarefas: </Typography>
    <ListTasks tasks={uncompletedTasks} onListUpdated={handleUpdateTasks}></ListTasks>
    <AddCircleOutlineIcon onClick={handleOpen} sx={{fontSize: '64px', cursor:'pointer'}}></AddCircleOutlineIcon>
     
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{...style, width: '20%' }}>
          <h2 id="child-modal-title">Criar Nova Tarefa</h2>
          <CreateTaskForm handleClose={handleClose} onTaskSubmitted={handleTaskSubmitted}></CreateTaskForm>
        </Box>
      </Modal>
      
    <Typography variant="h1">Tarefas Concluidas: </Typography> 
    <ListTasks tasks={completedTasks} onListUpdated={handleUpdateTasks}></ListTasks>
    </>
  )
}

export default App
