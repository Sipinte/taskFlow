import { useState } from "react";

import TaskForm from "./components/TaskForm";

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

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);

    console.log(
      "Tasks:",
      [...tasks, newTask]
    );
  };

  return (
    <TaskForm
      onAddTask={handleAddTask}
    />
  );
}

export default App;