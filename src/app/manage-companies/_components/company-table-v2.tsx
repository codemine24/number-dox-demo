import { AddDocumentModal } from "@/components/document-form-modal";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import {
  alpha,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
  isRowEditable: boolean;
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
  const [openDocument, setOpenDocument] = React.useState<{
    open: boolean;
    document_id: number | null;
    file_name: string | null;
  }>({
    open: false,
    document_id: null,
    file_name: null,
  });
  console.log("openDocument", openDocument);

  const [rows, setRows] = React.useState<TableRowData[]>([
    {
      id: 1,
      isRowEditable: false,
      docType: "value1",
      frequency: "value1",
      description: "",
      document: "",
      status: "pending",
      filedDate: null,
      dueDate: null,
      reminder: "",
      repeat: "",
      lastUpdated: null,
    },
  ]);

  const handleAddRow = () => {
    const newId =
      rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    const newRow: TableRowData = {
      id: newId,
      isRowEditable: true,
      docType: "value1",
      frequency: "weekly",
      description: "Description",
      document: "",
      status: "pending",
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

  const handleEditRow = (id: number) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, isRowEditable: !row.isRowEditable } : row
      )
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
                    {row.isRowEditable ? (
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
                    ) : (
                      <Typography color="text.secondary">
                        {row.docType}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.isRowEditable ? (
                      <FormControl fullWidth variant="standard">
                        <CustomSelect
                          value={row.frequency}
                          options={[
                            { label: "annual", value: "value1" },
                            { label: "monthly", value: "value2" },
                            { label: "weekly", value: "value3" },
                          ]}
                          onChange={(e: any) =>
                            handleInputChange(
                              row.id,
                              "frequency",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                    ) : (
                      <Typography color="text.secondary">
                        {row.frequency}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {row?.isRowEditable ? (
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
                    ) : (
                      <Typography color="text.secondary">
                        {row.description}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {row?.isRowEditable ? (
                      <Button
                        onClick={() =>
                          setOpenDocument({
                            open: true,
                            document_id: row.id,
                            file_name: null,
                          })
                        }
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
                        {openDocument.file_name &&
                        openDocument.document_id === row.id
                          ? openDocument.file_name
                          : "View"}
                      </Button>
                    ) : (
                      <Button
                        disabled
                        onClick={() =>
                          setOpenDocument({
                            open: true,
                            document_id: row.id,
                            file_name: null,
                          })
                        }
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
                        {openDocument.file_name &&
                        openDocument.document_id === row.id
                          ? openDocument.file_name
                          : "View"}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.isRowEditable ? (
                      <CustomSelect
                        value={row.status}
                        options={[
                          { label: "Draft", value: "draft" },
                          { label: "Publish", value: "publish" },
                          { label: "Pending", value: "pending" },
                        ]}
                        onChange={(e: any) =>
                          handleInputChange(row.id, "status", e.target.value)
                        }
                      />
                    ) : (
                      <Typography color="text.secondary">
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            bgcolor: `${alpha("#367BF5", 0.3)}`,
                            color: "#367BF5",
                            fontWeight: 500,
                            borderRadius: 2,
                          }}
                        />
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.isRowEditable ? (
                      <DesktopDatePicker
                        defaultValue={dayjs("2022-04-17")}
                        value={row.filedDate}
                        onChange={(date: any) =>
                          handleInputChange(row.id, "filedDate", date)
                        }
                        slotProps={{
                          textField: {
                            variant: "standard",
                            sx: {
                              backgroundColor: "white",
                              px: 1,
                              borderRadius: 2,
                            },
                            InputProps: {
                              disableUnderline: true,
                            },
                          },
                        }}
                      />
                    ) : (
                      <Typography color="text.secondary">
                        {row.filedDate
                          ? dayjs(row.filedDate).format("DD/MM/YYYY")
                          : "-"}
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    {row.isRowEditable ? (
                      <DesktopDatePicker
                        defaultValue={dayjs("2022-04-17")}
                        value={row.dueDate}
                        onChange={(date: any) =>
                          handleInputChange(row.id, "dueDate", date)
                        }
                        slotProps={{
                          textField: {
                            variant: "standard",
                            sx: {
                              backgroundColor: "white",
                              px: 1,
                              borderRadius: 2,
                            },
                            InputProps: {
                              disableUnderline: true,
                            },
                          },
                        }}
                      />
                    ) : (
                      <Typography color="text.secondary">
                        {row.filedDate
                          ? dayjs(row.filedDate).format("DD/MM/YYYY")
                          : "-"}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.isRowEditable ? (
                      <CustomInputField
                        value={row.reminder || ""}
                        placeholder="45"
                        onChange={(e) =>
                          handleInputChange(row.id, "reminder", e.target.value)
                        }
                      />
                    ) : (
                      <Typography color="text.secondary">
                        {row.reminder}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {row?.isRowEditable ? (
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
                    ) : (
                      <Typography color="text.secondary">
                        {row.repeat}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.isRowEditable ? (
                      <DesktopDatePicker
                        defaultValue={dayjs("2022-04-17")}
                        value={row.lastUpdated}
                        onChange={(date: any) =>
                          handleInputChange(row.id, "lastUpdated", date)
                        }
                        slotProps={{
                          textField: {
                            variant: "standard",
                            sx: {
                              backgroundColor: "white",
                              px: 1,
                              borderRadius: 2,
                            },
                            InputProps: {
                              disableUnderline: true,
                            },
                          },
                        }}
                      />
                    ) : (
                      <Typography color="text.secondary">
                        {row.filedDate
                          ? dayjs(row.filedDate).format("DD/MM/YYYY")
                          : "-"}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton onClick={() => handleDeleteRow(row.id)} disabled={rows.length === 1}>
                        <DeleteOutlineIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditRow(row.id)}>
                        {row.isRowEditable ? <DoneIcon /> : <EditIcon />}
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

      <AddDocumentModal
        open={openDocument.open}
        onClose={() =>
          setOpenDocument({
            open: false,
            document_id: null,
            file_name: null,
          })
        }
        onSave={(value) =>
          setOpenDocument({
            open: false,
            document_id: value.document_id,
            file_name: value.file_name,
          })
        }
        documentId={1}
      />
    </LocalizationProvider>
  );
};
