// Mengimport component UI dari library Material UI (MUI)
import {
  ToggleButton,      // tombol yang bisa aktif/nonaktif
  ToggleButtonGroup, // pembungkus group dari beberapa ToggleButton
} from "@mui/material";

// Mengimport tipe FilterStatus untuk TypeScript
import type { FilterStatus } from "../types/task";

// Mendefinisikan tipe props yang diterima component FilterBar
interface FilterBarProps {
  filter: FilterStatus;         // filter yang sedang aktif saat ini
  onFilterChange: (             // fungsi yang dipanggil saat filter diganti
    filter: FilterStatus
  ) => void;                    // void = fungsi ini tidak mengembalikan nilai apapun
}

// Component FilterBar — menerima props filter dan onFilterChange
const FilterBar = ({
  filter,           // filter aktif (dari App.tsx)
  onFilterChange,   // fungsi untuk ganti filter (dari App.tsx)
}: FilterBarProps) => {

  // Fungsi handler saat user klik salah satu tombol filter
  const handleChange = (
    _: React.MouseEvent<HTMLElement>, // event klik (diabaikan, makanya diberi nama _)
    newFilter: FilterStatus | null    // filter baru yang dipilih user (bisa null jika klik tombol yang sama)
  ) => {
    // Hanya update filter jika user klik tombol yang berbeda (bukan null)
    if (newFilter !== null) {
      onFilterChange(newFilter); // kirim filter baru ke App.tsx
    }
  };

  return (
    // Group pembungkus semua tombol filter
    <ToggleButtonGroup
      value={filter}          // tombol mana yang sedang aktif
      exclusive               // hanya boleh 1 tombol aktif dalam satu waktu
      onChange={handleChange} // fungsi yang dipanggil saat tombol diklik
      sx={{ mt: 3 }}          // sx = styling MUI, mt: 3 = margin top
    >
      {/* Tiga pilihan filter */}
      <ToggleButton value="Semua">
        Semua
      </ToggleButton>

      <ToggleButton value="Aktif">
        Aktif
      </ToggleButton>

      <ToggleButton value="Selesai">
        Selesai
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

// Mengekspor FilterBar sebagai default export
export default FilterBar;