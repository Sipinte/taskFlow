// section/task/components/TaskCounter.tsx
import { Typography } from "@mui/material";
import type { FilterStatus } from "../../../types/task";

interface ITaskCounterProps {
  filter: FilterStatus;
  total: number;
  active: number;
  done: number;
}

const TaskCounter = ({ filter, total, active, done }: ITaskCounterProps) => {
  const renderCounter = () => {
    if (filter === "Semua") return `Total task = ${total}, Task aktif = ${active}, Task selesai = ${done}`;
    if (filter === "Aktif") return `Tersisa ${active} task aktif`;
    if (filter === "Selesai") return `${done} tugas telah selesai`;
    return "";
  };

  return (
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {renderCounter()}
    </Typography>
  );
};

export default TaskCounter;