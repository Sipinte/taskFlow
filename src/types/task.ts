export type Priority =
  | "Rendah"
  | "Sedang"
  | "Tinggi";

export type FilterStatus =
  | "Semua"
  | "Aktif"
  | "Selesai";

export type Category =
  | "Pribadi"
  | "Kerjaan"
  | "Belajar"
  | "Lainnya";

export interface ITask {
  id: string;
  title: string;
  priority: Priority;
  category: Category[];
  done: boolean;
  createdAt: number;
  dueDate?: string; // property for due date
}

export interface ITaskFormInput {
  title: string;
  priority: Priority;
  category: Category[];
  dueDate?: string;
}

// ini namanya union type, artinya
// hanya bisa salah satu dari beberapa tipe

export const PRIORITY_OPTIONS: Priority[] = ["Rendah", "Sedang", "Tinggi"];

export const FILTER_STATUS_OPTIONS: FilterStatus[] = [
  "Semua",
  "Aktif",
  "Selesai",
];

export const CATEGORY_OPTIONS: Category[] = [
  "Pribadi",
  "Kerjaan",
  "Belajar",
  "Lainnya",
];