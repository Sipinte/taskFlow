// Mengimport hook useState untuk menyimpan data form
import { useState } from "react";

// Mengimport component UI dari Material UI
import {
  Button,      // tombol
  MenuItem,    // opsi di dalam dropdown
  Select,      // dropdown pilihan
  Stack,       // layout vertikal/horizontal dengan jarak otomatis
  TextField,   // input teks
  InputLabel,  // label untuk input
  FormControl, // pembungkus input + label agar terhubung
} from "@mui/material";

// Mengimport tipe Priority untuk TypeScript
import type { Priority } from "../types/task";

// Mendefinisikan tipe props yang diterima TaskForm
interface ITaskFormProps {
  onAddTask: (         // fungsi yang dipanggil saat form disubmit
    title: string,     // judul task yang diinput
    priority: Priority // prioritas yang dipilih
  ) => void;           // tidak mengembalikan nilai
}

// Component TaskForm — menerima props onAddTask dari App.tsx
const TaskForm = ({
  onAddTask,
}: ITaskFormProps) => {

  // State untuk menyimpan isi input judul task
  const [title, setTitle] =
    useState("");

  // State untuk menyimpan prioritas yang dipilih, default "Rendah"
  const [priority, setPriority] =
    useState<Priority>("Rendah");

  // State untuk melacak apakah form sudah pernah disubmit
  // (dipakai untuk menampilkan pesan error)
  const [submitted, setSubmitted] =
    useState(false);

  // true jika: form sudah disubmit DAN judul masih kosong
  // .trim() = hapus spasi di awal/akhir sebelum dicek
  const hasTitleError =
    submitted && !title.trim();

  // Fungsi yang dipanggil saat form disubmit
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> // tipe event dari form HTML
  ) => {
    e.preventDefault(); // mencegah halaman reload (perilaku default form HTML)

    setSubmitted(true); // tandai bahwa form sudah pernah disubmit

    // Jika judul kosong, hentikan proses — tampilkan error saja
    if (!title.trim()) {
      return;
    }

    // Kirim data task ke App.tsx
    onAddTask(
      title.trim(), // judul tanpa spasi di awal/akhir
      priority      // prioritas yang dipilih
    );

    // Reset form ke kondisi awal setelah berhasil submit
    setTitle("");
    setPriority("Rendah");
    setSubmitted(false);
  };

  return (
    // Form HTML biasa, onSubmit terhubung ke handleSubmit
    <form onSubmit={handleSubmit}>

      {/* Stack = layout vertikal, spacing={2} = jarak antar elemen */}
      <Stack spacing={2}>

        {/* Input judul task */}
        <TextField
          label="Nama Tugas"
          value={title}                    // nilai input dikontrol oleh state title
          onChange={(e) =>
            setTitle(e.target.value)       // update state setiap user ketik
          }
          error={hasTitleError}            // border merah jika ada error
          helperText={
            hasTitleError
              ? "Kolom ini wajib diisi"    // pesan error jika judul kosong
              : ""                         // kosong jika tidak ada error
          }
          required   // field wajib diisi
          fullWidth  // lebar 100%
        />

        {/* Dropdown prioritas — dibungkus FormControl agar label & select terhubung */}
        <FormControl fullWidth>

          {/* Label untuk dropdown, id harus sama dengan labelId di Select */}
          <InputLabel id="priority-label">
            Prioritas
          </InputLabel>

          <Select
            labelId="priority-label"  // menghubungkan Select ke InputLabel di atas
            label="Prioritas"         // label untuk keperluan styling MUI
            value={priority}          // nilai dropdown dikontrol oleh state priority
            onChange={(e) =>
              setPriority(
                e.target.value as Priority // cast ke tipe Priority (TypeScript)
              )
            }
          >
            {/* Tiga opsi prioritas */}
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

        {/* Tombol submit — type="submit" agar memicu onSubmit di form */}
        <Button
          type="submit"
          variant="contained" // style tombol solid (bukan outline)
        >
          Tambah Tugas
        </Button>
      </Stack>
    </form>
  );
};

// Mengekspor TaskForm sebagai default export
export default TaskForm;