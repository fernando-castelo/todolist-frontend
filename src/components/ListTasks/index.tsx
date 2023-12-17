import { FC } from "react";
import { Task } from "../../commom/types/entities";
import { Box, Card, CardContent, Typography } from "@mui/material";
import TaskCard from "../TaskCard";

const ListTasks = ({ tasks } :  {tasks: Task[]} ) => {
    return(
    <>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {tasks.map(task => (
                    <TaskCard task={task}></TaskCard>
                ))}
            </Box>
    </>
    )
}

export default ListTasks;