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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface TableRowData {
  id: number;
  docType: string;
  category: string;
  frequency: string;
  description: string;
  document: string;
  status: string;
  filedDate: Date | null;
  dueDate: Date | null;
  reminder: boolean;
  repeat: boolean;
  lastUpdated: Date;
}

export const CompanyTableV2 = () => {
  const [rows, setRows] = React.useState<TableRowData[]>([
    {
      id: 1,
      docType: "Invoice",
      category: "Tax",
      frequency: "weekly",
      description: "",
      document: "",
      status: "Pending",
      filedDate: null,
      dueDate: null,
      reminder: false,
      repeat: false,
      lastUpdated: new Date(),
    },
  ]);

  const handleAddRow = () => {
    const newRow: TableRowData = {
      id: rows.length + 1,
      name: "",
      frequency: "weekly",
      document: "",
      dueDate: null,
      reminder: false,
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
                    <TextField
                      value={row.docType || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, "docType", e.target.value)
                      }
                      variant="standard"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth variant="standard">
                      <Select
                        value={row.frequency}
                        onChange={(e) =>
                          handleInputChange(row.id, "frequency", e.target.value)
                        }
                      >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={row.description || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, "description", e.target.value)
                      }
                      variant="standard"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={row.document || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, "document", e.target.value)
                      }
                      variant="standard"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={row.status || ""}
                      onChange={(e) =>
                        handleInputChange(row.id, "status", e.target.value)
                      }
                      variant="standard"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      value={row.filedDate}
                      onChange={(newValue) =>
                        handleInputChange(row.id, "filedDate", newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" fullWidth />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      value={row.dueDate}
                      onChange={(newValue) =>
                        handleInputChange(row.id, "dueDate", newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" fullWidth />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={row.reminder || false}
                      onChange={(e) =>
                        handleInputChange(row.id, "reminder", e.target.checked)
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
                  <TableCell>
                    <DatePicker
                      value={row.lastUpdated}
                      onChange={(newValue) =>
                        handleInputChange(row.id, "lastUpdated", newValue)
                      }
                      renderInput={(params) => (
                        <TextField {...params} variant="standard" fullWidth />
                      )}
                      disabled
                    />
                  </TableCell>
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
