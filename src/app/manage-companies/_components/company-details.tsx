import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CompanyDetails = () => {
    return (
        <Box bgcolor='secondary.main' p={3} borderRadius={3} mt={3}>
            <Typography variant="body1" fontWeight={600}>Company Details</Typography>
            <Box mt={3} display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={3}>
                    <Typography variant="body2" >Company Name</Typography>
                    <Typography variant="body2" color="text.secondary">XYZ Company Limited</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={3}>
                    <Typography variant="body2">Company ID</Typography>
                    <Typography variant="body2" color="text.secondary">123456789</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={3}>
                    <Typography variant="body2">Company ID</Typography>
                    <Typography variant="body2" color="text.secondary">123456789</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={3}>
                    <Typography variant="body2">Company ID</Typography>
                    <Typography variant="body2" color="text.secondary">123456789</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CompanyDetails