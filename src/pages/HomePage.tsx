import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  Checkbox,
  IconButton,
  Chip,
  Paper,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import { useTasks } from "../section/task/context/TaskContext";
import type { Priority } from "../types/task";

type FilterType = "SEMUA" | "AKTIF" | "SELESAI";

const priorityColor = (
  priority: Priority
): "default" | "warning" | "error" => {
  if (priority === "Tinggi") return "error";
  if (priority === "Sedang") return "warning";
  return "default";
};

const isOverdue = (dueDate?: string, done?: boolean): boolean => {
  if (!dueDate || done) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export default function HomePage() {
  const navigate = useNavigate();
  const { tasks, toggleTask, deleteTask } = useTasks();

  const [filter, setFilter] = useState<FilterType>("SEMUA");

  const total = tasks.length;
  const active = tasks.filter((t) => !t.done).length;
  const done = tasks.filter((t) => t.done).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "AKTIF") return !t.done;
    if (filter === "SELESAI") return t.done;
    return true;
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Dashboard Task
        </Typography>
        <Button variant="contained" onClick={() => navigate("/task/add")}>
          Tambah Task
        </Button>
      </Box>

      <ButtonGroup sx={{ mb: 2 }}>
        <Button
          variant={filter === "SEMUA" ? "contained" : "outlined"}
          onClick={() => setFilter("SEMUA")}
        >
          Semua
        </Button>
        <Button
          variant={filter === "AKTIF" ? "contained" : "outlined"}
          onClick={() => setFilter("AKTIF")}
        >
          Aktif
        </Button>
        <Button
          variant={filter === "SELESAI" ? "contained" : "outlined"}
          onClick={() => setFilter("SELESAI")}
        >
          Selesai
        </Button>
      </ButtonGroup>

      <Typography sx={{ mb: 2 }}>
        Total task = {total}, Task aktif = {active}, Task selesai = {done}
      </Typography>

      {filteredTasks.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Tidak ada task untuk ditampilkan.
        </Alert>
      )}

      {filteredTasks.map((task) => {
        const overdue = isOverdue(task.dueDate, task.done);

        return (
          <Paper
            key={task.id}
            variant="outlined"
            sx={{
              mb: 2,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: overdue ? "error.main" : undefined,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Checkbox
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <Box>
                <Typography
                  onClick={() => navigate(`/task/${task.id}`)}
                  sx={{
                    textDecoration: task.done ? "line-through" : "none",
                    fontWeight: 500,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.done ? "Selesai" : "Aktif"}
                  {task.dueDate ? ` · Deadline: ${task.dueDate}` : ""}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {overdue && (
                <Chip label="Terlambat" color="error" size="small" />
              )}
              <Chip
                label={task.priority}
                color={priorityColor(task.priority)}
              />
              <IconButton
                color="error"
                onClick={() => deleteTask(task.id)}
                aria-label="Hapus task"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}