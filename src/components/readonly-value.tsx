import { Box, Typography } from "@mui/material";

export const ReadonlyValue = (value: any) => {
  return (
    <Box>
      <Typography>{value?.value}</Typography>
    </Box>
  );
};
