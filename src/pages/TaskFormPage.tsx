import { useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import TaskForm from "../section/task/components/TaskForm";
import type { ITaskFormValues } from "../section/task/components/TaskForm";
import { useTasks } from "../section/task/context/TaskContext";

import type { ITask } from "../types/task";

export default function TaskFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasks, addTask, updateTask } = useTasks();

  const isEditMode = Boolean(id);
  const existingTask = isEditMode
    ? tasks.find((t) => t.id === id)
    : undefined;

  // Kalau mode edit tapi id tidak ditemukan, redirect ke 404
  useEffect(() => {
    if (isEditMode && !existingTask) {
      navigate("/404", { replace: true });
    }
  }, [isEditMode, existingTask, navigate]);

  if (isEditMode && !existingTask) {
    return null;
  }

  const handleSubmit = (values: ITaskFormValues) => {
    if (isEditMode && existingTask) {
      updateTask(existingTask.id, values);
    } else {
      const newTask: ITask = {
        id: Date.now().toString(),
        title: values.title,
        priority: values.priority,
        category: values.category,
        done: false,
        createdAt: Date.now(),
        dueDate: values.dueDate,
      };
      addTask(newTask);
    }
    navigate("/");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" mb={3}>
        {isEditMode ? "Edit Task" : "Tambah Task"}
      </Typography>

      <TaskForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
        submitLabel={isEditMode ? "Simpan Perubahan" : "Tambah Tugas"}
        initialValues={
          existingTask
            ? {
                title: existingTask.title,
                priority: existingTask.priority,
                category: existingTask.category,
                dueDate: existingTask.dueDate,
              }
            : undefined
        }
      />
    </Paper>
  );
}