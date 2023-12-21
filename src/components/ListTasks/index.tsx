import { FC } from "react";
import { Task } from "../../commom/types/entities";
import { Box, Card, CardContent, Typography } from "@mui/material";
import TaskCard from "../TaskCard";


const ListTasks = ({ tasks, onListUpdated} :  {tasks: Task[], onListUpdated: (status: boolean, tasks : Task[]) => void} ) => {

    const handleTaskDeleted = (task : Task) => {

        const removeValue = (value: Task) => value.id !== task.id;

        const newTasks = tasks.filter(removeValue);

        const status = task.completed

        onListUpdated(status, newTasks);
    }


    return(
    <>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {tasks.map(task => (
                    <TaskCard task={task} onTaskDeleted={handleTaskDeleted}></TaskCard>
                ))}
            </Box>
    </>
    )
}

export default ListTasks;