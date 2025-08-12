"use client";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};

export default RootProvider;