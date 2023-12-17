import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getCompletedTasks} from './services/taskService';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function App() {

  const API_URL = 'http://localhost:8080/tasks';
  
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [uncompletedTasks, setUncompletedTasks] = useState<Task[]>([]);

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

  return (
    <>  

    <Typography variant="h1">Tarefas: </Typography>
    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
        {uncompletedTasks.map(task => (
            <Card sx={{width: '21%', height: '120px', margin: '10px', padding: '10px'}}>
              <CardContent>
                <Typography variant='h5'>{task.title}</Typography>
                <Typography variant='h6'>{task.description}</Typography>
              </CardContent>
            </Card>
        ))}
    </Box>

    <AddCircleOutlineIcon sx={{fontSize: '64px', cursor:'pointer'}}></AddCircleOutlineIcon>

     <Typography variant="h1">Tarefas Concluidas: </Typography> 
     <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
        {completedTasks.map(task => (
            <Card sx={{width: '21%', height: '120px', margin: '10px', padding: '10px'}}>
              <CardContent>
                <Typography variant='h5'>{task.title}</Typography>
                <Typography variant='h6'>{task.description}</Typography>
              </CardContent>
            </Card>
        ))}
      </Box>
    </>
  )
}

export default App
