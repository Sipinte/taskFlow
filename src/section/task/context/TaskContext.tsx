import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

import useLocalStorage from "../hooks/useLocalStorage";
import type { ITask } from "../../../types/task";

interface ITaskContext {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  addTask: (task: ITask) => void;
  updateTask: (id: string, updated: Partial<ITask>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskContext = createContext<ITaskContext | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<ITask[]>("tasks", []);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const showSnackbar = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const addTask = (task: ITask) => {
    setTasks((prev) => [...prev, task]);
    showSnackbar(`Tugas "${task.title}" berhasil ditambahkan`, "success");
  };

  const updateTask = (id: string, updated: Partial<ITask>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
    showSnackbar(`Tugas berhasil diperbarui`, "success");
  };

  const deleteTask = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showSnackbar(`Tugas "${target?.title ?? ""}" berhasil dihapus`, "error");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, updateTask, deleteTask, toggleTask }}
    >
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </TaskContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks harus dipakai di dalam <TaskProvider>");
  }
  return context;
}