import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

import { PRIORITY_OPTIONS, CATEGORY_OPTIONS } from "../../../types/task";
import { taskSchema, TaskSchemaType } from "../utils/taskSchema";

interface ITaskFormProps {
  onSubmit: (values: TaskSchemaType) => void;
  onCancel?: () => void;
  submitLabel?: string;
  initialValues?: TaskSchemaType;
}

const TaskForm = ({
  onSubmit,
  onCancel,
  submitLabel = "Tambah Tugas",
  initialValues,
}: ITaskFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskSchemaType>({
    resolver: yupResolver(taskSchema) as Resolver<TaskSchemaType>,
    defaultValues: initialValues ?? {
      title: "",
      priority: "Rendah",
      category: [],
      dueDate: "",
    },
  });

  const onValid = (values: TaskSchemaType) => {
    onSubmit(values);
    if (!initialValues) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Stack spacing={2}>
        <TextField
          label="Nama Tugas"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          required
          fullWidth
        />

        <TextField
          label="Deadline"
          type="date"
          {...register("dueDate")}
          error={!!errors.dueDate}
          helperText={errors.dueDate?.message}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.priority}>
              <InputLabel id="priority-label">Prioritas</InputLabel>
              <Select {...field} labelId="priority-label" label="Prioritas">
                {PRIORITY_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
              {errors.priority && (
                <FormHelperText>{errors.priority.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel id="category-label">Kategori</InputLabel>
              <Select
                {...field}
                labelId="category-label"
                label="Kategori"
                multiple
                value={field.value ?? []}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
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
              {errors.category && (
                <FormHelperText>{errors.category.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
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