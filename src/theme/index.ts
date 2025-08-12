import { createTheme } from "@mui/material";
import { palette } from "./palette";

export const theme = createTheme({
    palette,
    breakpoints: {
        values: {
            xs: 0,
            sm: 460,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
});