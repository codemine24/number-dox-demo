import { MenuItem, Select } from "@mui/material";

interface ISelectProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: any;
  sx?: any;
}
export const CustomSelect = ({
  value,
  options,
  onChange,
  sx = {},
}: ISelectProps) => {
  return (
    <Select
    
      value={value}
      onChange={onChange}
      variant="standard"
      sx={{
        "&:before": { border: "none" },
        "&:after": { border: "none" },
        "&:hover:not(.Mui-disabled):before": { border: "none" },
        backgroundColor: "white",
        px: 1, 
        borderRadius: 1, 
        ...sx,
      }}
      disableUnderline
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};
