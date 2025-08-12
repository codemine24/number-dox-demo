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
    Link,
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
import { usePathname } from "next/navigation"

const drawerWidth = 260
const collapsedDrawerWidth = 60

interface MenuItem {
    text: string
    icon: React.ReactNode
    href?: string
    active?: boolean
    children?: MenuItem[]
}


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)
    const path = usePathname()
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
        {
            text: "Dashboard",
            href: "/",
            active: path === "/",
            icon: <DashboardIcon />
        },
        {
            text: "Manage Companies",
            href: "/manage-companies",
            icon: <BusinessIcon />,
            active: path === "/manage-companies",
        },
        {
            text: "Manage Users",
            icon: <PeopleIcon />,
            children: [
                {
                    text: "All Users",
                    href: "/manage-users/all",
                    active: path === "/manage-users/all",
                    icon: <CircleIcon sx={{ fontSize: 8 }} />
                },
                {
                    text: "Admin Users",
                    href: "/manage-users/admin",
                    active: path === "/manage-users/admin",
                    icon: <CircleIcon sx={{ fontSize: 8 }} />
                },
            ],
        },
        {
            text: "Settings",
            href: "/settings",
            active: path === "/settings",
            icon: <SettingsIcon />
        },
    ]

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const hasChildren = item.children && item.children.length > 0
        const isItemOpen = openItems[item.text]

        return (
            <React.Fragment key={item.text}>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href={item.href}
                        onClick={() => hasChildren && handleToggleItem(item.text)}
                        sx={{
                            backgroundColor: item.active ? "primary.main" : "transparent",
                            color: item.active ? "white" : "inherit",
                            "&:hover": {
                                backgroundColor: item.active ? "primary.main" : "rgba(0, 0, 0, 0.04)",
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
                                <ListItemText primary={item.text} slotProps={{ primary: { fontSize: 14 } }} />
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
                height: "calc(100vh - 64px)",
                width: isOpen ? drawerWidth : collapsedDrawerWidth,
                flexShrink: 0,
                overflow: "visible",
                transition: "width 0.3s",
                "& .MuiDrawer-paper": {
                    width: isOpen ? drawerWidth : collapsedDrawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "background.paper",
                    transition: "width 0.3s",
                    overflow: "visible",
                    position: "relative",
                    zIndex: 98,
                },
            }}
        >
            {/* Toggle Button Toolbar */}
            <IconButton
                onClick={handleToggleSidebar}
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    transform: "translateX(50%)",
                    zIndex: 99,
                    color: "#fff",
                    backgroundColor: "text.primary",
                    width: 30,
                    height: 30,
                    "&:hover": {
                        backgroundColor: "text.primary",
                    },
                }}
            >
                {isOpen ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
            </IconButton>


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
