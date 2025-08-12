import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import * as React from "react";
import { CustomInputField } from "./custom-input";
import { CustomSelect } from "./custom-select";

interface TableRowData {
  id: number;
  docType: string;
  frequency: string;
  description: string;
  document: string;
  status: string;
  filedDate: PickerValue | null;
  dueDate: PickerValue | null;
  reminder: string;
  repeat: string;
  lastUpdated: PickerValue | null;
}

export const CompanyTableV2 = () => {
  const [rows, setRows] = React.useState<TableRowData[]>([
    {
      id: 1,
      docType: "value1",
      frequency: "value1",
      description: "",
      document: "",
      status: "value1",
      filedDate: null,
      dueDate: null,
      reminder: "",
      repeat: "",
      lastUpdated: null,
    },
  ]);

  const handleAddRow = () => {
    const newRow: TableRowData = {
      id: 1,
      docType: "value1",
      frequency: "weekly",
      description: "Description",
      document: "",
      status: "Pending",
      filedDate: null,
      dueDate: null,
      reminder: "",
      repeat: "",
      lastUpdated: null,
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleInputChange = (
    id: number,
    field: keyof TableRowData,
    value: any
  ) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRow}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{
            "& .MuiTableCell-root": {
              padding: "6px",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ bgcolor: "secondary.main" }}>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Doc type</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Frequency</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Description</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Document</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Status</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Filed Date</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Due Date</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Reminder</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Repeat</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Last Updated</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow>
                  <TableCell>
                    <CustomSelect
                      value={row.docType}
                      options={[
                        { label: "Full accounts", value: "value1" },
                        { label: "Dormant Company", value: "value2" },
                      ]}
                      onChange={(e: any) =>
                        handleInputChange(row.id, "docType", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth variant="standard">
                      <CustomSelect
                        value={row.frequency}
                        options={[
                          { label: "annual", value: "value1" },
                          { label: "monthly", value: "value2" },
                          { label: "weekly", value: "value3" },
                        ]}
                        onChange={(e: any) =>
                          handleInputChange(row.id, "frequency", e.target.value)
                        }
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TableCell>
                      <CustomInputField
                        value={row.description || ""}
                        placeholder="Description"
                        onChange={(e) =>
                          handleInputChange(
                            row.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      component="label"
                      sx={{
                        border: "1px solid",
                        borderColor: "text.primary",
                        color: "text.secondary",
                        textTransform: "none",
                        borderRadius: 2,
                        py: 0,
                        px: 1,
                      }}
                    >
                      <AttachFileIcon
                        sx={{ transform: "rotate(45deg)", fontSize: 20 }}
                      />
                      Attach
                    </Button>
                  </TableCell>
                  <TableCell>
                    <CustomSelect
                      value={row.status}
                      options={[
                        { label: "Draft", value: "value1" },
                        { label: "Publish", value: "value2" },
                        { label: "Pending", value: "value3" },
                      ]}
                      onChange={(e: any) =>
                        handleInputChange(row.id, "status", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <DesktopDatePicker
                      defaultValue={dayjs("2022-04-17")}
                      value={row.filedDate}
                      onChange={(date: any) =>
                        handleInputChange(row.id, "filedDate", date)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <DesktopDatePicker
                      defaultValue={dayjs("2022-04-17")}
                      value={row.dueDate}
                      onChange={(date: any) =>
                        handleInputChange(row.id, "dueDate", date)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <CustomInputField
                      value={row.reminder || ""}
                      placeholder="45"
                      onChange={(e) =>
                        handleInputChange(row.id, "reminder", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <CustomSelect
                      value={row.repeat}
                      options={[
                        { label: "Daily", value: "value1" },
                        { label: "Weekly", value: "value2" },
                      ]}
                      onChange={(e: any) =>
                        handleInputChange(row.id, "repeat", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <DesktopDatePicker
                      defaultValue={dayjs("2022-04-17")}
                      value={row.lastUpdated}
                      onChange={(date: any) =>
                        handleInputChange(row.id, "lastUpdated", date)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => handleDeleteRow(row.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteRow(row.id)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={11}
                    sx={{
                      py: 0,
                      borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  />
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LocalizationProvider>
  );
};
