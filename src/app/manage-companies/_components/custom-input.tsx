import { TextField, TextFieldProps } from "@mui/material";

export const CustomInputField = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      variant="standard"
      fullWidth
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'white',
          borderRadius: '4px',
          padding: '8px 12px',
        },
        '& .MuiInputBase-input': {
          padding: 0,
        },
        '&:before': {
          borderBottom: 'none !important',
        },
        '&:after': {
          borderBottom: 'none !important',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: 'none !important',
        },
        ...props.sx
      }}
      InputProps={{
        disableUnderline: true,
        ...props.InputProps
      }}
    />
  );
};