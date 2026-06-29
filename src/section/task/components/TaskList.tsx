// section/task/components/TaskList.tsx
import { Stack, Alert } from "@mui/material";
import type { ITask } from "../../../types/task";
import TaskItem from "./TaskItem";

interface ITaskListProps {
  tasks: ITask[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
}

const TaskList = ({ tasks, onToggleTask, onDeleteTask, onEditTask }: ITaskListProps) => {
  return (
    <Stack spacing={2}>
      {tasks.length === 0 ? (
        <Alert severity="info">Tidak ada task</Alert>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))
      )}
    </Stack>
  );
};

export default TaskList;