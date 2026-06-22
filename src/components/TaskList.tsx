import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import type { ITask } from "../types/task";

interface TaskListProps {
  tasks: ITask[];
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
}: TaskListProps) => {
  // EMPTY STATE (conditional rendering)
  if (tasks.length === 0) {
    return (
      <Typography
        sx={{ mt: 3, textAlign: "center" }}
      >
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
              {/* TASK TITLE */}
              <Typography
                sx={{
                  textDecoration: task.done
                    ? "line-through"
                    : "none",
                  fontWeight: 500,
                }}
              >
                {task.title}
              </Typography>

              {/* PRIORITY CHIP */}
              <Chip
                label={task.priority}
                color={getPriorityColor(
                  task.priority
                )}
                size="small"
              />
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