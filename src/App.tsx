import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
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
    useLocalStorage<ITask[]>("tasks", []);

  const [filter, setFilter] =
    useState<FilterStatus>("Semua");

  // ADD TASK
  const handleAddTask = (
    title: string,
    priority: Priority,
    dueDate?: string
  ) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      title,
      priority,
      done: false,
      createdAt: Date.now(),
      dueDate, // ← string langsung, tidak dikonversi
    };

    setTasks((prev) => [...prev, newTask]);
  };

  // TOGGLE TASK
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  // DELETE TASK
  const handleDeleteTask = (id: string) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // EDIT TASK
  const handleEditTask = (
    id: string,
    newTitle: string
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    );
  };

  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Aktif") return !task.done;
    if (filter === "Selesai") return task.done;
    return true;
  });

  // COUNTERS
  const total = tasks.length;
  const active = tasks.filter((task) => !task.done).length;
  const done = tasks.filter((task) => task.done).length;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <TaskForm onAddTask={handleAddTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        filter={filter}
        total={total}
        active={active}
        done={done}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}

export default App;