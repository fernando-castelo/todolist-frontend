import { FC } from "react";
import { Task } from "../../commom/types/entities";
import { Box, Card, CardContent, Typography } from "@mui/material";

const ListTasks = ({ tasks } :  {tasks: Task[]} ) => {
    return(
    <>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {tasks.map(task => (
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

export default ListTasks;