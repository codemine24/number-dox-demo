"use client"

import React from "react";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    List,
    Link,
} from "@mui/material";
import { MenuItem as MenuItemType } from "./sidebar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface MenuItemProps {
    isOpen: boolean;
    openItems: { [key: string]: boolean };
    handleToggleItem: (itemText: string) => void;
    item: MenuItemType;
    level?: number;
}

export const MenuItem = ({ isOpen, openItems, handleToggleItem, item, level = 0 }: MenuItemProps) => {
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
                        {item.children!.map((child) => MenuItem({ isOpen, openItems, handleToggleItem, item: child, level: level + 1 }))}
                    </List>
                </Collapse>
            )}
        </React.Fragment>
    );
};
