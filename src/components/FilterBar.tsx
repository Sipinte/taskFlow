import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import type { FilterStatus } from "../types/task";

interface FilterBarProps {
  filter: FilterStatus;
  onFilterChange: (
    filter: FilterStatus
  ) => void;
}

const FilterBar = ({
  filter,
  onFilterChange,
}: FilterBarProps) => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: FilterStatus | null
  ) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleChange}
      sx={{ mt: 3 }}
    >
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

export default FilterBar;