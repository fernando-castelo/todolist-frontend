import { Box, Button, Card, CardActions, CardContent, Modal, Typography } from "@mui/material";
import { Task } from "../../commom/types/entities";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useState } from "react";
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import List from '@mui/material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './taskcard.css'
import { Link, useNavigate } from "react-router-dom";
import { deleteTask } from "../../services/taskService";

const TaskCard = ({ task, onTaskDeleted} : {task: Task, onTaskDeleted: (task: Task) => void}) => {

    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false)


    const handleOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };

    const handleOpenModalDelete = () => {
        setOpenModalDelete(true)
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false)
    }

    const handleTaskDelete = () => {
        setOpen(false) 
        setOpenModalDelete(false)
        deleteTask(task.id)
        onTaskDeleted(task)
    }

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

    return (
        <>
            <Card onClick={handleOpen} sx={{width: '21%', margin: '10px', padding: '10px', cursor: 'pointer'}}>
                <CardContent>
                    <Typography variant='h5'>{task.title}</Typography>
                    <Typography variant='h6'>{task.description}</Typography>
                </CardContent> 
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
             <Box sx={{...style, width: '20%'}}>
                <Typography sx={{textAlign: 'center'}}variant="h4">
                    {task.title}
                </Typography>
                <Typography variant="h5">
                   Descricao:  {task.description}
                </Typography>
                <Typography variant="h5">
                   Categoria:  {task.category}
                </Typography>
                <Divider/>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                      component="nav"
                      aria-labelledby="actions-list"
                >
                    <Link to={`tasks/${task.id}`}>
                        <ListItemButton>
                            <ListItemIcon>
                                <EditIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Editar Tarefa"/>
                        </ListItemButton>
                    </Link>
                    <ListItemButton>
                        <ListItemIcon>
                            <DeleteIcon/>
                        </ListItemIcon>
                        <ListItemText onClick={handleOpenModalDelete} primary="Deletar Tarefa"/>
                    </ListItemButton>  

                    <Modal
                        open={openModalDelete}
                        onClose={handleCloseModalDelete}
                    >
                        <Box sx={{...style, width: '20%'}}>
                            <Typography sx={{textAlign: 'center'}}variant="h5">
                                    Desejar deletar essa task?
                            </Typography>
                            <Box sx={{display: 'flex', marginLeft: '20%'}}>
                                <Button sx={{margin: '5%'}} variant="outlined" onClick={handleTaskDelete}>
                                    Sim
                                </Button>
                                <Button sx={{margin: '5%'}} variant="outlined" onClick={handleCloseModalDelete}>
                                    Nao
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </List>
             </Box>
            </Modal>
        </>
    )
    
}

export default TaskCard;

