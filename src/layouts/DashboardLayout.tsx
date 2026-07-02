import { Outlet } from "react-router-dom";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { Link } from "react-router-dom";

const drawerWidth = 220;

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>

      <AppBar position="fixed">

        <Toolbar>

          <Typography variant="h6">
            TaskFlow
          </Typography>

        </Toolbar>

      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            mt: 8,
          },
        }}
      >
        <List>

          <ListItemButton component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/task/add">
            <ListItemText primary="Tambah Task" />
          </ListItemButton>

        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: `${drawerWidth}px`,
        }}
      >
        <Outlet />
      </Box>

    </Box>
  );
}