import { Box, Card, CardActions, CardContent, Modal, Typography } from "@mui/material";
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

const TaskCard = ({ task } : {task: Task}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

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
                   ID:  {task.id}
                </Typography>
                <Divider/>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                      component="nav"
                      aria-labelledby="actions-list"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Editar Tarefa"/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <DeleteIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Deletar Tarefa"/>
                    </ListItemButton>
                    
                </List>
             </Box>
            </Modal>
        </>
    )
    
}

export default TaskCard;

