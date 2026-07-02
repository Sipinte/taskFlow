import { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  Chip,
  Box,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

import type { Priority, Category } from "../../../types/task";
import { PRIORITY_OPTIONS, CATEGORY_OPTIONS } from "../../../types/task";

export interface ITaskFormValues {
  title: string;
  priority: Priority;
  category: Category[];
  dueDate?: string;
}

interface ITaskFormProps {
  onSubmit: (values: ITaskFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
  initialValues?: ITaskFormValues;
}

const TaskForm = ({
  onSubmit,
  onCancel,
  submitLabel = "Tambah Tugas",
  initialValues,
}: ITaskFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [priority, setPriority] = useState<Priority>(
    initialValues?.priority ?? "Rendah"
  );
  const [category, setCategory] = useState<Category[]>(
    initialValues?.category ?? []
  );
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? "");
  const [submitted, setSubmitted] = useState(false);

  const hasTitleError = submitted && !title.trim();
  const hasCategoryError = submitted && category.length === 0;

  const handleCategoryChange = (e: SelectChangeEvent<Category[]>) => {
    const value = e.target.value;
    setCategory(
      typeof value === "string" ? (value.split(",") as Category[]) : value
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    if (!title.trim() || category.length === 0) {
      return;
    }

    onSubmit({
      title: title.trim(),
      priority,
      category,
      dueDate: dueDate || undefined,
    });

    // Reset hanya kalau bukan mode edit (mode add)
    if (!initialValues) {
      setTitle("");
      setPriority("Rendah");
      setCategory([]);
      setDueDate("");
      setSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Nama Tugas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={hasTitleError}
          helperText={hasTitleError ? "Kolom ini wajib diisi" : ""}
          required
          fullWidth
        />

        <TextField
          label="Deadline"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth>
          <InputLabel id="priority-label">Prioritas</InputLabel>
          <Select
            labelId="priority-label"
            label="Prioritas"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth error={hasCategoryError}>
          <InputLabel id="category-label">Kategori</InputLabel>
          <Select
            labelId="category-label"
            label="Kategori"
            multiple
            value={category}
            onChange={handleCategoryChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as Category[]).map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
          {hasCategoryError && (
            <FormHelperText>Pilih minimal satu kategori</FormHelperText>
          )}
        </FormControl>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            {submitLabel}
          </Button>
          {onCancel && (
            <Button type="button" variant="text" onClick={onCancel}>
              Batal
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;