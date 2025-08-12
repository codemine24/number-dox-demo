"use client";

import {
  Business as BusinessIcon,
  ChevronLeft,
  ChevronRight,
  Circle as CircleIcon,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const drawerWidth = 260;
const collapsedDrawerWidth = 60;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  href?: string;
  active?: boolean;
  children?: MenuItem[];
}

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const path = usePathname();
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleItem = (itemText: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemText]: !prev[itemText],
    }));
  };

  const sidebarItems: MenuItem[] = [
    {
      text: "Dashboard",
      href: "/",
      active: path === "/",
      icon: <DashboardIcon />,
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
      href: "/manage-users",
      active: path === "/manage-users",
    },
    {
      text: "Settings",
    //   href: "/settings",
    //   active: path === "/settings",
      icon: <SettingsIcon />,
      children: [
        {
          text: "All Users",
          href: "/settings/all",
          active: path === "/settings/all",
          icon: <CircleIcon sx={{ fontSize: 8 }} />,
        },
        {
          text: "Admin Users",
          href: "/settings/admin",
          active: path === "/settings/admin",
          icon: <CircleIcon sx={{ fontSize: 8 }} />,
        },
      ],
    },
  ];

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemOpen = openItems[item.text];

    return (
      <React.Fragment key={item.text}>
        <ListItem disablePadding sx={{ px: isOpen ? 2 : 0, borderRadius: 2 }}>
          <ListItemButton
            component={Link}
            href={item.href}
            onClick={() => hasChildren && handleToggleItem(item.text)}
            sx={{
              backgroundColor: item.active ? "primary.main" : "transparent",
              color: item.active ? "white" : "inherit",
              borderRadius: 3,
              "&:hover": {
                backgroundColor: item.active
                  ? "primary.main"
                  : "rgba(0, 0, 0, 0.04)",
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
                <ListItemText
                  primary={item.text}
                  slotProps={{ primary: { fontSize: 14 } }}
                />
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
    );
  };

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
          top: 1,
          right: 0,
          transform: "translateX(50%)",
          zIndex: 99,
          color: "#fff",
          backgroundColor: "text.primary",
          width: 20,
          height: 20,
          "&:hover": {
            backgroundColor: "text.primary",
          },
        }}
      >
        {isOpen ? (
          <ChevronLeft fontSize="small" />
        ) : (
          <ChevronRight fontSize="small" />
        )}
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
  );
};
