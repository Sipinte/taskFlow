import { Button, Stack, Typography } from "@mui/material";

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Stack spacing={2}>

      <Typography variant="h3">
        404
      </Typography>

      <Typography>
        Halaman tidak ditemukan.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
      >
        Kembali ke Dashboard
      </Button>

    </Stack>
  );
}