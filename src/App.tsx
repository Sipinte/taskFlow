import { useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

import type {
  ITask,
  Priority,
  FilterStatus,
} from "./types/task";

function App() {
  const [tasks, setTasks] =
    useState<ITask[]>([]);

  const [filter, setFilter] =
    useState<FilterStatus>("Semua");

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

  const handleToggleTask = (
    id: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
            }
          : task
      )
    );
  };

  const handleDeleteTask = (
    id: string
  ) => {
    setTasks((prev) =>
      prev.filter(
        (task) => task.id !== id
      )
    );
  };

  const filteredTasks =
    tasks.filter((task) => {
      if (filter === "Aktif") {
        return !task.done;
      }

      if (filter === "Selesai") {
        return task.done;
      }

      return true;
    });

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <TaskForm
        onAddTask={handleAddTask}
      />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onToggleTask={
          handleToggleTask
        }
        onDeleteTask={
          handleDeleteTask
        }
      />
    </div>
  );
}

export default App;