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
                overflow="hidden"
            >
                <Sidebar />
                <Box flex={1} p={2} height="calc(100vh - 64px)" sx={{ overflowY: "auto" }}>{children}</Box>
            </Box>
        </Box>)
};

export default AppRootLayout;
