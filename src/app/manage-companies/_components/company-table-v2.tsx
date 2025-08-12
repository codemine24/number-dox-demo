import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  Box,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "@mui/lab/DatePicker";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomSelect } from "./custom-select";
import { CustomInputField } from "./custom-input";
import { Attachment } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import dayjs from "dayjs";
import { CustomDatePicker } from "./custom-date-picker";
import { PickerValue } from "@mui/x-date-pickers/internals";

interface TableRowData {
  id: number;
  docType: string;
  frequency: string;
  description: string;
  document: string;
  status: string;
  filedDate: PickerValue | null;
  dueDate: Date | null;
  reminder: boolean;
  repeat: boolean;
  lastUpdated: Date;
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
      reminder: false,
      repeat: false,
      lastUpdated: new Date(),
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
      reminder: false,
      repeat: false,
      lastUpdated: new Date(),
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
        <Table>
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
                      sx={{border: "none"}}
                      onChange={(date: any) =>
                        handleInputChange(row.id, "dueDate", date)
                      }
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.reminder || false}
                      onChange={(e) =>
                        handleInputChange(row.id, "filedDate", e.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.repeat || false}
                      onChange={(e) =>
                        handleInputChange(row.id, "repeat", e.target.checked)
                      }
                    />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteRow(row.id)}>
                      <DeleteIcon />
                    </IconButton>
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
