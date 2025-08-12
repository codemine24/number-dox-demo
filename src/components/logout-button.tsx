import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const LogoutButton = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <ListItem disablePadding sx={{ px: isOpen ? 2 : 0, borderRadius: 2 }}>
            <ListItemButton
                sx={{
                    color: "error.main",
                    minHeight: 48,
                }}
            >
                <ListItemIcon
                    sx={{
                        color: "error.main",
                        minWidth: isOpen ? 40 : "auto",
                        justifyContent: "center",
                    }}
                >
                    <LogoutIcon />
                </ListItemIcon>
                {isOpen && (
                    <ListItemText
                        primary="Logout"
                        slotProps={{ primary: { fontSize: 14 } }}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
};