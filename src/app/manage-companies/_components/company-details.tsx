"use client"

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { alpha, Snackbar } from "@mui/material";
import { Check } from "@mui/icons-material";
import { CustomSelect } from "./custom-select";

export const CompanyDetails = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    name: "XYZ Company Limited",
    alias: "QuickCorp",
    status: "Active",
    companyNo: "123456789",
  });

  const handleSave = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Message = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Button
        size="small"
        sx={{
          bgcolor: 'success.main',
          color: 'white',
          borderRadius: "10px",
          minWidth: "auto",
        }}
      >
        <Check />
      </Button>
      <Typography>
        Company details updated successfully
      </Typography>
    </Box>
  );

  return (
    <Box bgcolor="secondary.main" p={3} borderRadius={3} mt={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600}>
          Company Details
        </Typography>

        {isEdit ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Button startIcon={<EditIcon />} variant="contained" size="small" onClick={handleSave}>Save</Button>
            <Button variant="contained" color="error" size="small" onClick={() => setIsEdit(false)}>Cancel</Button>
          </Box>
        ) : (
          <Button startIcon={<EditIcon />} variant="contained" size="small" onClick={() => setIsEdit(true)}>Edit</Button>
        )}
      </Box>

      <Grid
        container
        mt={3}
        spacing={1}
      >
        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Typography variant="body2">Company Name</Typography>
          {isEdit ? (
            <TextField
              size="small"
              fullWidth
              value={companyDetails.name}
              onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {companyDetails.name}
            </Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Typography variant="body2">Alias</Typography>
          {isEdit ? (
            <TextField
              size="small"
              fullWidth
              value={companyDetails.alias}
              onChange={(e) => setCompanyDetails({ ...companyDetails, alias: e.target.value })}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {companyDetails.alias}
            </Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Typography variant="body2">Status</Typography>
          {isEdit ? (
            <CustomSelect
              sx={{ width: "100%", py: 0.5, bgcolor: "transparent", border: '1px solid #ccc' }}
              value={companyDetails.status}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              onChange={(e: any) =>
                setCompanyDetails({ ...companyDetails, status: e.target.value })
              }
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {companyDetails.status}
            </Typography>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Typography variant="body2">Company No</Typography>
          {isEdit ? (
            <TextField
              size="small"
              fullWidth
              value={companyDetails.companyNo}
              onChange={(e) => setCompanyDetails({ ...companyDetails, companyNo: e.target.value })}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {companyDetails.companyNo}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message={<Message />}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          sx: {
            backgroundColor: '#caefca',
            color: "success.main",
            borderRadius: "8px",
            elevation: 0,
            boxShadow: "none",
          },
        }}
      />
    </Box>
  );
};
