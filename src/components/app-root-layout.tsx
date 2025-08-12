import Box from "@mui/material/Box";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const AppRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <Navbar />
            <Box
                maxHeight="calc(100vh - 64px)"
                display="flex"
                alignItems='start'
                gap={2}
                overflow="hidden"
            >
                <Sidebar activeRoute="/" />
                <Box flex={1}>{children}</Box>
            </Box>
        </Box>)
};

export default AppRootLayout;
