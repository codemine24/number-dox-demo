"use client";

import {
  Business as BusinessIcon,
  ChevronLeft,
  ChevronRight,
  Circle as CircleIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { LogoutButton } from "./logout-button";
import { MenuItem } from "./menu-item";

const drawerWidth = 260;
const collapsedDrawerWidth = 60;

export interface MenuItem {
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

      <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <List sx={{ pb: '0px !important' }}>
          {sidebarItems.map((item) => <MenuItem
            isOpen={isOpen}
            openItems={openItems}
            handleToggleItem={handleToggleItem}
            item={item}
            key={item.text}
          />)}
          <LogoutButton isOpen={isOpen} />
        </List>

        {isOpen && <Box p={2} textAlign="center">
          <Typography variant="body2" sx={{ mt: 2 }}>
            Version: 2.0.1
          </Typography>
          <Typography variant="body2">
            Copyright© 2025 NUMBERDOX
            All Rights Reserved
          </Typography>
        </Box>}
      </Box>
    </Drawer>
  );
};
