"use client";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DesktopDatePicker, DesktopDatePickerProps } from "@mui/x-date-pickers";

const BorderlessTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "white",
    padding: "6px 10px", // Reduced padding
    borderRadius: "4px",
  },
  "& .MuiInputBase-input": {
    padding: 0,
  },
  "&:before, &:after, &:hover:not(.Mui-disabled):before": {
    borderBottom: "none !important",
  },
});

export const CustomDatePicker = (props: DesktopDatePickerProps<any>) => {
  return (
    <DesktopDatePicker
      {...props}
      slots={{
        textField: BorderlessTextField,
      }}
      slotProps={{
        textField: {
          variant: "standard",
          fullWidth: true,
          InputProps: {
            disableUnderline: true,
          },
        },
      }}
    />
  );
};