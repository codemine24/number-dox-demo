import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowBack } from "@mui/icons-material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const SectionHeader = () => {
    return (
        <Box display="flex" alignItems="center" gap={1} justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
                <ArrowBack />
                <Typography variant="h6">XYZ Companies</Typography>
            </Box>
            <Box>
                <FormatListBulletedIcon />
            </Box>
        </Box>
    )
}

export default SectionHeader
