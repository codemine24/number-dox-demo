"use client";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const path = usePathname().split("/")[1].replace("-", " ");

  return (
    <Box
      height={64}
      width="100%"
      bgcolor="primary.main"
      sx={{
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <Box width={260}>
        <Typography
          sx={{
            px: 2,
            py: 1,
            border: 1,
            display: "inline-block",
            borderColor: "white",
            borderRadius: 2,
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          Logo
        </Typography>
      </Box>
      <Box flex={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography sx={{ textTransform: "capitalize" }}>{path || "Dashboard"}</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <NotificationsIcon />
          <Typography variant="body2">John@numberbox.com</Typography>
        </Box>
      </Box>
    </Box>
  );
};
