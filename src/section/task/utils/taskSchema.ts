import * as yup from "yup";
import { PRIORITY_OPTIONS, CATEGORY_OPTIONS } from "../../../types/task";

export const taskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Nama tugas wajib diisi")
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),

  priority: yup
    .string()
    .oneOf(PRIORITY_OPTIONS, "Prioritas tidak valid")
    .required("Prioritas wajib dipilih"),

  category: yup
    .array()
    .of(yup.string().oneOf(CATEGORY_OPTIONS).required())
    .min(1, "Pilih minimal satu kategori")
    .required("Kategori wajib dipilih"),

  dueDate: yup
    .string()
    .optional()
    .test(
      "not-in-past",
      "Deadline tidak boleh tanggal di masa lalu",
      (value) => {
        if (!value) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(value);
        due.setHours(0, 0, 0, 0);
        return due >= today;
      }
    ),
});

export type TaskSchemaType = yup.InferType<typeof taskSchema>;