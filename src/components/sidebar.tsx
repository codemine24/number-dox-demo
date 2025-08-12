"use client"

import React, { useState } from "react"
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Toolbar,
    Divider,
    Box,
    Collapse,
    IconButton,
} from "@mui/material"
import {
    Dashboard as DashboardIcon,
    Business as BusinessIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    ExpandLess,
    ExpandMore,
    Circle as CircleIcon,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material"

const drawerWidth = 240
const collapsedDrawerWidth = 60

interface MenuItem {
    text: string
    icon: React.ReactNode
    active?: boolean
    children?: MenuItem[]
}

interface SidebarProps {
    activeRoute: string
}

export default function Sidebar({ activeRoute }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true)
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

    const handleToggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const handleToggleItem = (itemText: string) => {
        setOpenItems((prev) => ({
            ...prev,
            [itemText]: !prev[itemText],
        }))
    }

    const sidebarItems: MenuItem[] = [
        { text: "Dashboard", icon: <DashboardIcon /> },
        {
            text: "Manage Companies",
            icon: <BusinessIcon />,
            active: activeRoute === "manage-companies",
            children: [
                { text: "All Companies", icon: <CircleIcon sx={{ fontSize: 8 }} /> },
                { text: "Active Companies", icon: <CircleIcon sx={{ fontSize: 8 }} /> },
                { text: "Archived Companies", icon: <CircleIcon sx={{ fontSize: 8 }} /> },
            ],
        },
        {
            text: "Manage Users",
            icon: <PeopleIcon />,
            children: [
                { text: "All Users", icon: <CircleIcon sx={{ fontSize: 8 }} /> },
                { text: "Admin Users", icon: <CircleIcon sx={{ fontSize: 8 }} /> },
            ],
        },
        { text: "Settings", icon: <SettingsIcon /> },
    ]

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const hasChildren = item.children && item.children.length > 0
        const isItemOpen = openItems[item.text]

        return (
            <React.Fragment key={item.text}>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => hasChildren && handleToggleItem(item.text)}
                        sx={{
                            pl: 2 + level * 2,
                            backgroundColor: item.active ? "#1976d2" : "transparent",
                            color: item.active ? "white" : "inherit",
                            "&:hover": {
                                backgroundColor: item.active ? "#1976d2" : "rgba(0, 0, 0, 0.04)",
                            },
                            minHeight: 48,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: item.active ? "white" : "inherit",
                                minWidth: isOpen ? 40 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        {isOpen && (
                            <>
                                <ListItemText primary={item.text} />
                                {hasChildren && (isItemOpen ? <ExpandLess /> : <ExpandMore />)}
                            </>
                        )}
                    </ListItemButton>
                </ListItem>
                {hasChildren && isOpen && (
                    <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children!.map((child) => renderMenuItem(child, level + 1))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        )
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                height: "100vh",
                width: isOpen ? drawerWidth : collapsedDrawerWidth,
                flexShrink: 0,
                transition: "width 0.3s",
                "& .MuiDrawer-paper": {
                    width: isOpen ? drawerWidth : collapsedDrawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#f5f5f5",
                    transition: "width 0.3s",
                    overflowX: "hidden",
                    position: "relative",
                },
            }}
        >
            <Toolbar>
                {isOpen && (
                    <Typography variant="h6" sx={{ color: "#666", fontSize: "14px" }}>
                        Annual Report
                    </Typography>
                )}
                <IconButton
                    onClick={handleToggleSidebar}
                    sx={{
                        position: "absolute",
                        right: isOpen ? 8 : "50%",
                        transform: isOpen ? "none" : "translateX(50%)",
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        width: 24,
                        height: 24,
                        "&:hover": {
                            backgroundColor: "#f0f0f0",
                        },
                    }}
                >
                    {isOpen ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
                </IconButton>
            </Toolbar>
            <Divider />
            <List>{sidebarItems.map((item) => renderMenuItem(item))}</List>
            {isOpen && (
                <Box sx={{ mt: "auto", p: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                        Logout
                    </Typography>
                </Box>
            )}
        </Drawer>
    )
}
