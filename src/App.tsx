import { useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import type {
  ITask,
  Priority,
} from "./types/task";

function App() {
  const [tasks, setTasks] =
    useState<ITask[]>([]);

  const handleAddTask = (
    title: string,
    priority: Priority
  ) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      title,
      priority,
      done: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [
      ...prev,
      newTask,
    ]);
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;