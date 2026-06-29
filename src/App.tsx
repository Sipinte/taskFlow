import { useState } from "react";
import useLocalStorage from "./section/task/hooks/useLocalStorage";
import TaskForm from "./section/task/components/TaskForm";
import TaskList from "./section/task/components/TaskList";
import FilterBar from "./section/task/components/FilterBar";
import TaskCounter from "./section/task/components/TaskCounter"; // ← tambah

import type { ITask, Priority, FilterStatus } from "./types/task";
import { Snackbar, Alert } from "@mui/material";

function App() {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);
  const [filter, setFilter] = useState<FilterStatus>("Semua");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "warning",
  });

  const handleAddTask = (title: string, priority: Priority, dueDate?: string) => {
    const newTask: ITask = {
      id: Date.now().toString(),
      title,
      priority,
      done: false,
      createdAt: Date.now(),
      dueDate,
    };
    setTasks((prev) => [...prev, newTask]);
    setSnackbar({ open: true, message: "Tugas berhasil ditambahkan!", severity: "success" });
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setSnackbar({ open: true, message: "Tugas berhasil dihapus!", severity: "warning" });
  };

  const handleEditTask = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Aktif") return !task.done;
    if (filter === "Selesai") return task.done;
    return true;
  });

  const total = tasks.length;
  const active = tasks.filter((task) => !task.done).length;
  const done = tasks.filter((task) => task.done).length;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
      <TaskForm onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskCounter filter={filter} total={total} active={active} done={done} /> {/* ← tambah */}
      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "success" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ open: false, message: "", severity: "success" })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;