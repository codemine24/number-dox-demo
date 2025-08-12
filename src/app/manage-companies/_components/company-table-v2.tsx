import { DataTable } from "@/components/data-table";
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { GridColDef, GridRowModel, GridSortModel } from "@mui/x-data-grid";
import * as React from "react";

const rows: GridRowModel[] = [
  {
    id: 1,
    docType: "Invoice",
    frequency: "Monthly",
    description: "Invoice for monthly subscription",
    document: "invoice_august_2025.pdf",
    date: "2025-08-01",
    endDate: "2025-08-31",
    dueDate: "2025-08-15",
    reminder: "2025-08-10",
    report: "finance_report_q3.pdf",
    lastUpdated: "2025-08-01",
  },
  {
    id: 2,
    docType: "Report",
    frequency: "Quarterly",
    description: "Quarterly performance report",
    document: "q3_performance.pdf",
    date: "2025-07-01",
    endDate: "2025-09-30",
    dueDate: "2025-10-05",
    reminder: "2025-09-25",
    report: "summary_q3.docx",
    lastUpdated: "2025-08-05",
  },
  {
    id: 3,
    docType: "Compliance",
    frequency: "Yearly",
    description: "Annual compliance document",
    document: "compliance_2025.pdf",
    date: "2025-01-01",
    endDate: "2025-12-31",
    dueDate: "2025-12-01",
    reminder: "2025-11-15",
    report: "compliance_summary.docx",
    lastUpdated: "2025-06-30",
  },
  {
    id: 4,
    docType: "Contract",
    frequency: "One-time",
    description: "Signed partnership agreement",
    document: "partnership_contract.pdf",
    date: "2025-03-15",
    endDate: "2027-03-15",
    dueDate: "2025-03-15",
    reminder: "2025-03-10",
    report: "contract_summary.pdf",
    lastUpdated: "2025-03-16",
  },
  {
    id: 5,
    docType: "Audit",
    frequency: "Bi-Annual",
    description: "Mid-year financial audit",
    document: "audit_june_2025.pdf",
    date: "2025-06-01",
    endDate: "2025-06-30",
    dueDate: "2025-07-15",
    reminder: "2025-07-01",
    report: "audit_findings.pdf",
    lastUpdated: "2025-07-10",
  },
  {
    id: 6,
    docType: "Tax",
    frequency: "Yearly",
    description: "Corporate tax return",
    document: "tax_return_2024.pdf",
    date: "2025-04-15",
    endDate: "2025-04-15",
    dueDate: "2025-04-30",
    reminder: "2025-04-25",
    report: "tax_summary_2024.pdf",
    lastUpdated: "2025-04-18",
  },
  {
    id: 7,
    docType: "Memo",
    frequency: "As Needed",
    description: "Internal update on policy changes",
    document: "policy_update_memo.pdf",
    date: "2025-08-10",
    endDate: "2025-08-10",
    dueDate: "2025-08-12",
    reminder: "2025-08-11",
    report: "policy_summary.docx",
    lastUpdated: "2025-08-11",
  },
  {
    id: 8,
    docType: "Checklist",
    frequency: "Weekly",
    description: "Weekly task checklist",
    document: "checklist_wk32_2025.xlsx",
    date: "2025-08-04",
    endDate: "2025-08-10",
    dueDate: "2025-08-10",
    reminder: "2025-08-09",
    report: "tasks_summary.pdf",
    lastUpdated: "2025-08-10",
  },
  {
    id: 9,
    docType: "Notice",
    frequency: "As Needed",
    description: "Notice of system maintenance",
    document: "maintenance_notice.pdf",
    date: "2025-08-05",
    endDate: "2025-08-06",
    dueDate: "2025-08-05",
    reminder: "2025-08-04",
    report: "downtime_report.pdf",
    lastUpdated: "2025-08-06",
  },
  {
    id: 10,
    docType: "Plan",
    frequency: "Monthly",
    description: "Operational plan for August",
    document: "august_plan.pdf",
    date: "2025-08-01",
    endDate: "2025-08-31",
    dueDate: "2025-08-01",
    reminder: "2025-07-31",
    report: "ops_plan_summary.docx",
    lastUpdated: "2025-08-01",
  },
];

const columns: GridColDef[] = [
  {
    field: "docType",
    headerName: "Doc. Type",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "frequency",
    headerName: "Frequency",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    sortable: false,
    filterable: false,
    minWidth: 200,
  },
  {
    field: "document",
    headerName: "Document",
    flex: 1,
    sortable: false,
    filterable: false,
    minWidth: 200,
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "endDate",
    headerName: "End Date",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "reminder",
    headerName: "Reminder",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "report",
    headerName: "Report",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "lastUpdated",
    headerName: "Last Updated",
    flex: 1,
    sortable: true,
    filterable: true,
    minWidth: 150,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <IconButton>
          <Icon icon="material-symbols-light:delete-outline" />
        </IconButton>
      );
    },
  },
];

export function CompanyTableV2() {
  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);

  return (
    <Box mt={3}>
      <DataTable
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
      />
    </Box>
  );
}
