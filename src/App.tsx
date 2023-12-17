import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card, CardContent, Modal, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Task } from './commom/types/entities';
import ListTasks from './components/ListCompletedTasks';
import CreateUpdateTaskForm from './components/CreateUpdateTaskForm';

function App() {

  const API_URL = 'http://localhost:8080/tasks';
  
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

  const handleGetCompletedTasks = () => {
    const status = 'completed'
  
    fetch(`${API_URL}/?status=${status}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
      
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCompletedTasks(data)
    }) 
  
  }

  const handleGetUncompletedTasks = () => {
    const status = 'uncompleted'
  
    fetch(`${API_URL}/?status=${status}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
      
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setUncompletedTasks(data)
    }) 
  
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


  return (
    <>  
    <Typography variant="h1">Tarefas: </Typography>
    <ListTasks tasks={uncompletedTasks}></ListTasks>
    <AddCircleOutlineIcon onClick={handleOpen} sx={{fontSize: '64px', cursor:'pointer'}}></AddCircleOutlineIcon>
     
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{...style, width: 200 }}>
          <h2 id="child-modal-title">Criar Nova Tarefa</h2>
          <CreateUpdateTaskForm handleClose={handleClose} onTaskSubmitted={handleTaskSubmitted}></CreateUpdateTaskForm>
        </Box>
      </Modal>
      
    <Typography variant="h1">Tarefas Concluidas: </Typography> 
    <ListTasks tasks={completedTasks}></ListTasks>
    </>
  )
}

export default App
