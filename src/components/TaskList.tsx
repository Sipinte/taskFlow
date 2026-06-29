import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
  Checkbox,
  Alert,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import type { ITask, FilterStatus } from "../types/task";
import { useState } from "react";

interface TaskListProps {
  tasks: ITask[];
  filter: FilterStatus;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
  total: number;
  active: number;
  done: number;
}

const getPriorityColor = (priority: ITask["priority"]) => {
  switch (priority) {
    case "Rendah":
      return "default";
    case "Sedang":
      return "warning";
    case "Tinggi":
      return "error";
    default:
      return "default";
  }
};

const TaskList = ({
  tasks,
  filter,
  total,
  active,
  done,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) => {

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const renderCounter = () => {
    if (filter === "Semua") {
      return `Total task = ${total}, Task aktif = ${active}, Task selesai = ${done}`;
    }
    if (filter === "Aktif") {
      return `Tersisa ${active} task aktif`;
    }
    if (filter === "Selesai") {
      return `${done} tugas telah selesai`;
    }
    return "";
  };

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {renderCounter()}
      </Typography>

      {tasks.length === 0 ? (
        <Alert severity="info">kosong</Alert>
      ) : (
        tasks.map((task) => (
          <Card key={task.id}>
            <CardContent>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                {/* LEFT */}
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Checkbox
                    checked={task.done}
                    onChange={() => onToggleTask(task.id)}
                  />

                  {editingId === task.id ? (
                    <TextField
                      value={editValue}
                      size="small"
                      autoFocus
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => {
                        if (editValue.trim()) {
                          onEditTask(task.id, editValue.trim());
                        }
                        setEditingId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (editValue.trim()) {
                            onEditTask(task.id, editValue.trim());
                          }
                          setEditingId(null);
                        }
                        if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                    />
                  ) : (
                    <Typography
                      onClick={() => {
                        setEditingId(task.id);
                        setEditValue(task.title);
                      }}
                      sx={{
                        textDecoration: task.done ? "line-through" : "none",
                        cursor: "pointer",
                      }}
                    >
                      {task.title}
                    </Typography>
                  )}
                </Stack>

                {/* RIGHT */}
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    size="small"
                  />
                  <IconButton
                    color="error"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Typography variant="caption" sx={{ color: "gray" }}>
                {task.done ? "Selesai" : "Aktif"}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Stack>
  );
};

export default TaskList;