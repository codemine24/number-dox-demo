import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

export const SelectDocType = () => {
  const [value, setValue] = React.useState("pdf");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      sx={{
        width: "100%",
        border: "none",
        outline: "none",
        "& .MuiSelect-icon": {
          display: "none",
        },
        "& .MuiSelect-select": {
          padding: "8px 32px 8px 12px",
          backgroundColor: "transparent",
        },
        "&.Mui-focused": {
          boxShadow: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
        "&:hover": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      }}
      variant="standard"
      disableUnderline
    >
      <MenuItem value="pdf">PDF</MenuItem>
      <MenuItem value="image">Image</MenuItem>
      <MenuItem value="excel">Excel</MenuItem>
    </Select>
  );
};
