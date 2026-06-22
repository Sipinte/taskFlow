import { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";

import type { Priority } from "../types/task";

interface ITaskFormProps {
  onAddTask: (
    title: string,
    priority: Priority
  ) => void;
}

const TaskForm = ({
  onAddTask,
}: ITaskFormProps) => {
  const [title, setTitle] =
    useState("");

  const [priority, setPriority] =
    useState<Priority>("Rendah");

  const [submitted, setSubmitted] =
    useState(false);

  const hasTitleError =
    submitted && !title.trim();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSubmitted(true);

    if (!title.trim()) {
      return;
    }

    onAddTask(
      title.trim(),
      priority
    );

    setTitle("");
    setPriority("Rendah");
    setSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Nama Tugas"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          error={hasTitleError}
          helperText={
            hasTitleError
              ? "Kolom ini wajib diisi"
              : ""
          }
          required
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="priority-label">
            Prioritas
          </InputLabel>

          <Select
            labelId="priority-label"
            label="Prioritas"
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as Priority
              )
            }
          >
            <MenuItem value="Rendah">
              Rendah
            </MenuItem>

            <MenuItem value="Sedang">
              Sedang
            </MenuItem>

            <MenuItem value="Tinggi">
              Tinggi
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
        >
          Tambah Tugas
        </Button>
      </Stack>
    </form>
  );
};

export default TaskForm;