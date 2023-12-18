import { Task } from "../commom/types/entities";
import { getTaskById } from "../services/taskService";
import { Form, useLoaderData } from "react-router-dom";

export async function loader({ params } : {params : any}) {
    const task = await getTaskById(params.taskId);
    return { task };
}

export default function UpdateTask() {
    const { task } = useLoaderData() as { task: Task }

  return (
    <div id="task">
      <div>
        <h1>{task.title}</h1>
        <h1>{task.description}</h1>
      </div>
    </div>
  );
}