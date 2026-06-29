// section/task/components/TaskItem.tsx
import {
  Card, CardContent, Chip, Stack,
  Typography, IconButton, Checkbox, TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import type { ITask } from "../../../types/task";

interface ITaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const getPriorityColor = (priority: ITask["priority"]) => {
  switch (priority) {
    case "Rendah": return "default";
    case "Sedang": return "warning";
    case "Tinggi": return "error";
    default: return "default";
  }
};

const isOverdue = (task: ITask) => {
  if (!task.dueDate || task.done) return false;
  const today = new Date().toISOString().split("T")[0];
  const due = new Date(task.dueDate).toISOString().split("T")[0];
  return due < today;
};

const TaskItem = ({ task, onToggle, onDelete, onEdit }: ITaskItemProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  return (
    <Card>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* LEFT */}
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Checkbox checked={task.done} onChange={() => onToggle(task.id)} />

            {editingId === task.id ? (
              <TextField
                value={editValue}
                size="small"
                autoFocus
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => {
                  if (editValue.trim()) onEdit(task.id, editValue.trim());
                  setEditingId(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (editValue.trim()) onEdit(task.id, editValue.trim());
                    setEditingId(null);
                  }
                  if (e.key === "Escape") setEditingId(null);
                }}
              />
            ) : (
              <Typography
                onClick={() => { setEditingId(task.id); setEditValue(task.title); }}
                sx={{ textDecoration: task.done ? "line-through" : "none", cursor: "pointer" }}
              >
                {task.title}
              </Typography>
            )}
          </Stack>

          {/* RIGHT */}
          <Stack direction="row" spacing={1}>
            <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" />
            {isOverdue(task) && <Chip label="Terlambat" color="error" size="small" />}
            <IconButton color="error" onClick={() => onDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Typography variant="caption" sx={{ color: "gray" }}>
          {task.done ? "Selesai" : "Aktif"}
          {task.dueDate ? ` · Deadline: ${task.dueDate}` : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskItem;