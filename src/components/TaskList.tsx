import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
  Checkbox,
  Alert,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import type { ITask, FilterStatus } from "../types/task";

interface TaskListProps {
  tasks: ITask[];
  filter: FilterStatus;

  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;

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
}: TaskListProps) => {
  // COUNTER TEXT (FILTER BASED)
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
      {/* COUNTER (SMALLER TYPOGRAPHY) */}
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {renderCounter()}
      </Typography>

      {/* EMPTY STATE (ONLY ALERT, NO TYPOGRAPHY) */}
      {tasks.length === 0 ? (
        <Alert severity="info">
          kosong
        </Alert>
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

                  <Typography
                    sx={{
                      textDecoration: task.done
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {task.title}
                  </Typography>
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