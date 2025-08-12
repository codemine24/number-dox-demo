"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridSortModel,
  useGridApiRef,
  GridApi,
} from "@mui/x-data-grid";
import { Icon } from "@iconify/react";

import SwapVertIcon from "@mui/icons-material/SwapVert";

interface CustomTableProps {
  rows: GridRowModel[];
  columns: GridColDef[];
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
}

export const DataTable: React.FC<CustomTableProps> = ({
  rows,
  columns,
  sortModel,
  onSortModelChange,
}) => {
  const apiRef = useGridApiRef();

  // Custom render for column headers with custom icons
  const customColumns = columns.map((col) => {
    const columnDef = {
      ...col,
      renderHeader: () => {
        const isSorted =
          sortModel && sortModel.length > 0 && sortModel[0].field === col.field;
        const sortDirection = isSorted ? sortModel![0].sort : null;

        const handleSortClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          let newSort: GridSortModel = [];

          if (!isSorted) {
            newSort = [{ field: col.field, sort: "asc" }];
          } else if (sortDirection === "asc") {
            newSort = [{ field: col.field, sort: "desc" }];
          } else {
            newSort = [];
          }

          onSortModelChange?.(newSort);
        };

        const handleFilterClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          const gridApi = apiRef.current as GridApi;
          gridApi.showFilterPanel(col.field);
        };

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "default",
              userSelect: "none",
              width: "100%",
              gap: 0.5,
            }}
          >
            <Box>{col.headerName}</Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {col.sortable && (
                <SwapVertIcon
                  fontSize="small"
                  sx={{
                    cursor: "pointer",
                    transform:
                      sortDirection === "desc" ? "rotate(180deg)" : "none",
                    color: isSorted ? "primary.main" : "inherit",
                  }}
                  onClick={handleSortClick}
                  aria-label="Sort"
                />
              )}
              {col.filterable && (
                <Icon
                  icon="cil:filter"
                  fontSize="small"
                  onClick={handleFilterClick}
                  aria-label="Filter"
                  style={{ cursor: "pointer" }}
                />
              )}
            </Box>
          </Box>
        );
      },
    };

    return { ...columnDef, minWidth: columnDef.minWidth };
  });

  return (
    <Box sx={{ maxHeight: 400, width: "100%" }}>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={customColumns}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        disableColumnMenu={true}
        sx={{
          ".MuiDataGrid-columnSeparator": { display: "none" },
          ".MuiDataGrid-iconButtonContainer": { display: "none" },
          ".MuiDataGrid-columnHeader": { backgroundColor: "secondary.main" },
        }}
        filterMode="client"
      />
    </Box>
  );
};
