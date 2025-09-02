import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Button, Avatar } from "@mui/material";
import { Notifications, Add } from "@mui/icons-material";

export const Header = ()=> {
  return (
    <AppBar position="static" color="default" sx={{ bgcolor: "#111827", color: "white", boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={4}>
          <Typography variant="h6" fontWeight="bold">notzspot</Typography>
          <Box display={{ xs: "none", md: "flex" }} gap={3}>
            {["Home", "Activities", "Calendar", "Accounts", "Leads", "Campaigns", "Reports", "More"].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{ cursor: "pointer", "&:hover": { color: "orange" }, ...(item === "Leads" && { fontWeight: 600 }) }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right: Actions */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <Button variant="contained" startIcon={<Add />} sx={{ bgcolor: "orange", "&:hover": { bgcolor: "darkorange" } }}>
            New Lead
          </Button>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src="https://i.pravatar.cc/40" />
            <Typography variant="body2">Easin Arafat</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
