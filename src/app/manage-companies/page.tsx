import Box from "@mui/material/Box";
import { CompanyDetails } from "./_components/company-details";
import { CompanyTableContent } from "./_components/company-table-content";
import { SectionHeader } from "./_components/section-header";

const ManageCompaniesPage = () => {
  return (
    <Box>
      {/* Header */}
      <SectionHeader />

      {/* Company details */}
      <CompanyDetails />

      {/* Company table */}
      <CompanyTableContent />
    </Box>
  );
};

export default ManageCompaniesPage;
