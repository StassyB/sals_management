import React, { useMemo, useState } from "react";
import { AppBar,Toolbar,Drawer,List,ListItem,ListItemIcon,ListItemText,IconButton,InputBase,Box,Avatar,Badge,Menu,MenuItem,Typography,Paper,Tooltip,CssBaseline, } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Correct imports for icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SellIcon from "@mui/icons-material/Sell";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Products", icon: <InventoryIcon />, path: "/products" },
  { text: "Sales", icon: <SellIcon />, path: "/sales" },
  { text: "Customers", icon: <PeopleIcon />, path: "/customers" },
  { text: "Reports", icon: <BarChartIcon />, path: "/reports" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
const [themeMode, setThemeMode] = useState("light");

  const toggleDrawer = () => setOpen((prev) => !prev);
  const handleProfileOpen = (e) => setAnchorEl(e.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);
  const toggleTheme = () =>
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));

  // Create MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...(themeMode === "light"
            ? {
                primary: { main: "#6c5ce7" }, // soft purple
                background: { default: "#fbfbfd", paper: "#ffffff" },
                text: { primary: "#000" },
              }
            : {
                primary: { main: "#a29bfe" },
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#fff" },
              }),
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Topbar */}
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            boxShadow: "none",
            borderBottom: (t) =>
              themeMode === "light"
                ? `1px solid rgba(124, 219, 36, 0.04)`
                : `1px solid rgba(255,255,255,0.08)`,
            zIndex: 1201,
          }}
        >
          <Toolbar sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Left: Menu + Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={toggleDrawer} size="large">
                <MenuIcon />
              </IconButton>
              <Box
                component="img"
                src="/logo.jpg"
                alt="Logo"
                sx={{
                  width: 36,
                  height: 36,
                  objectFit: "contain",
                  position: "absolute",
                  left: "10%",
                  display: { xs: "none", sm: "block" },
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, position: "absolute",
                  left: "14%", display: { xs: "none", sm: "block" } }}
              >
                SalesTrack
              </Typography>
            </Box>

            {/* Center: Search */}
             <Paper
    sx={{
      p: "6px 12px",
      display: "flex",
      alignItems: "center",
      width: { xs: "70%", sm: "50%", md: "40%" },
      maxWidth: 500,
      borderRadius: "20px",
      boxShadow:
        themeMode === "light"
          ? "0 6px 18px rgba(108,92,231,0.06)"
          : "0 6px 18px rgba(0,0,0,0.6)",
      border:
        themeMode === "light"
          ? "1px solid rgba(108,92,231,0.04)"
          : "1px solid rgba(255,255,255,0.03)",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    }}
  >
    <SearchIcon sx={{ color: "primary.main", mr: 1 }} />
    <InputBase placeholder="Search Products" fullWidth />
  </Paper>

            {/* Right: Theme Toggle + Profile */}
            <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title={themeMode === "light" ? "Switch to dark" : "Switch to light"}>
                <IconButton onClick={toggleTheme} size="large">
                  {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton size="large">
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Box
                onMouseEnter={handleProfileOpen}
                // onMouseLeave={handleProfileClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  borderRadius: 2,
                  px: 1,
                  py: 0.25,
                  "&:hover": {
                    bgcolor:
                      themeMode === "light"
                        ? "rgba(108,92,231,0.04)"
                        : "rgba(255,255,255,0.02)",
                  },
                }}
              >
                <Avatar alt="Admin" src="/avatar.png"  sx={{
                width: 42,
                height: 42,
                bgcolor: "#b0c4de", // Placeholder circle
              }} />
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Admin
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Admin
                  </Typography>
                </Box>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
                <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
                <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: open ? 240 : 72,
            [`& .MuiDrawer-paper`]: {
              width: open ? 240 : 72,
              top: 64,
              height: "calc(100% - 64px)",
              overflowX: "hidden",
              bgcolor: themeMode === "light" ? "#f7f8fc" : "rgba(8,12,20,0.7)",
              boxShadow: "none",
              borderRadius: open ? "0 0 16px 0" : "0 0 12px 0",
            },
          }}
        >
          <List sx={{ pt: 1 }}>
  {menuItems.map((item) => (
    <Tooltip key={item.text} title={!open ? item.text : ""} placement="right" arrow>
      <ListItem
        button
        component={Link}
        to={item.path}
        selected={location.pathname === item.path}
        sx={{
          justifyContent: open ? "flex-start" : "center",
          px: open ? 2.5 : 1,
          py: 1.25,
          color: location.pathname === item.path
            ? "primary.main"       // selected text color
            : "text.primary",      // normal text color
          "&:hover": {
            bgcolor: themeMode === "light"
              ? "rgba(15, 3, 110, 0.08)"
              : "rgba(162,155,254,0.08)",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 2 : 0,
            justifyContent: "center",
            display: "flex",
            color: location.pathname === item.path
              ? "primary.main"      // selected icon color
              : "text.primary",     // normal icon color
          }}
        >
          {item.icon}
        </ListItemIcon>
        {open && <ListItemText primary={item.text} />}
      </ListItem>
    </Tooltip>
  ))}
</List>

        </Drawer>

        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, mt: 3, p: 10 }}>
        {children}
      </Box>
      </Box>
    </ThemeProvider>
  );
}
