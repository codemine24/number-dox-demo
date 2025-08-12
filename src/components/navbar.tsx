"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <Box
      height={64}
      bgcolor="primary.main"
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        color: "white",
        textTransform: "uppercase",
      }}
    >
      <Typography
        sx={{
          border: 1,
          borderColor: "white",
          px: 2,
          py: 1,
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
  );
};
