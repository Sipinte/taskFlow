import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Chip, Button, Paper, Stack } from "@mui/material";

import { useTasks } from "../section/task/context/TaskContext";
import type { Priority } from "../types/task";

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

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, deleteTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (!task) {
      navigate("/404", { replace: true });
    }
  }, [task, navigate]);

  if (!task) {
    return null;
  }

  const overdue = isOverdue(task.dueDate, task.done);

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h4" mb={3}>
        Detail Task
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Judul
          </Typography>
          <Typography variant="h5">{task.title}</Typography>
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary" display="block">
            Status
          </Typography>
          <Chip
            label={task.done ? "Selesai" : "Aktif"}
            color={task.done ? "success" : "default"}
          />
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary" display="block">
            Prioritas
          </Typography>
          <Chip label={task.priority} color={priorityColor(task.priority)} />
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary" display="block">
            Kategori
          </Typography>
          {task.category && task.category.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {task.category.map((cat) => (
                <Chip key={cat} label={cat} variant="outlined" />
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">-</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary" display="block">
            Deadline
          </Typography>
          {task.dueDate ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>{task.dueDate}</Typography>
              {overdue && <Chip label="Overdue" color="error" size="small" />}
            </Stack>
          ) : (
            <Typography color="text.secondary">-</Typography>
          )}
        </Box>

        <Box>
          <Typography variant="overline" color="text.secondary" display="block">
            Dibuat pada
          </Typography>
          <Typography>
            {new Date(task.createdAt).toLocaleString("id-ID")}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            onClick={() => navigate(`/task/edit/${task.id}`)}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Hapus
          </Button>
          <Button variant="text" onClick={() => navigate("/")}>
            Kembali
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}