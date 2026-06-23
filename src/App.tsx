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

    //add task function
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

  // toggle task done function
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={(taskId) => {
          setTasks((prev) => prev.filter((task) => task.id !== taskId));
        }}
      />
    </div>
  );
}

export default App;