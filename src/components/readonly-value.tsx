import { Box, Typography } from "@mui/material";

export const ReadonlyValue = (value: any) => {
    console.log('value', value);
    
  return (
    <Box>
      <Typography>{value?.value}</Typography>
    </Box>
  );
};
