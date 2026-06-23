import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import type { ITask } from "../types/task";

interface TaskListProps {
  tasks: ITask[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const getPriorityColor = (
  priority: ITask["priority"]
) => {
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
  onToggleTask,
  onDeleteTask,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <Typography sx={{ mt: 3 }}>
        Belum ada tugas
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              {/* LEFT SIDE */}
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {/* TOGGLE CHECKBOX */}
                <Checkbox
                  checked={task.done}
                  onChange={() =>
                    onToggleTask(task.id)
                  }
                />

                {/* TITLE */}
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

              {/* RIGHT SIDE */}
              <Stack direction="row" spacing={1}>
                <Chip
                  label={task.priority}
                  color={getPriorityColor(
                    task.priority
                  )}
                  size="small"
                />

                {/* DELETE BUTTON */}
                <IconButton
                  onClick={() =>
                    onDeleteTask(task.id)
                  }
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>

            {/* STATUS */}
            <Typography
              variant="caption"
              sx={{ color: "gray" }}
            >
              {task.done
                ? "Selesai"
                : "Aktif"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default TaskList;