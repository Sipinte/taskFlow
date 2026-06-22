export type Priority =
  | "Rendah"
  | "Sedang"
  | "Tinggi";

export type FilterStatus =
  | "Semua"
  | "Aktif"
  | "Selesai";

export interface ITask {
  id: string;
  title: string;
  priority: Priority;
  done: boolean;
  createdAt: number;
}